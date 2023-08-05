import { RequestHandler } from 'express'
import asyncHandler from 'express-async-handler'
import ChangeLog, { ChangeLogType } from '~/models/ChangeLog.model'
import Household from '~/models/Household.model'
import Resident from '~/models/Resident.model'
import jwt, { JwtPayload } from 'jsonwebtoken'
import mongoose from 'mongoose'

/**
 * @desc Get households by pages
 * @route GET /households
 * @access Public
 */
export const getHouseholdByPage: RequestHandler = asyncHandler(async (req, res) => {
  const { page, limit } = req.query

  const households = await Household.find()
    .skip((parseInt((page as string) ?? 1) - 1) * parseInt((limit as string) ?? 10))
    .limit(parseInt((limit as string) ?? 10))
    .populate(['thanhVienHo', 'chu_ho'])
    .sort({ updatedAt: -1 })
    .lean()

  const total = await Household.count()

  res.json({ data: households, total })
})

/**
 * @desc Get households by id
 * @route GET /households/:id
 * @access Public
 */
export const getHouseholdById: RequestHandler = asyncHandler(async (req, res) => {
  const id = req.params.id

  const households = await Household.findById(id).populate(['thanhVienHo', 'chu_ho'])
  if (!households) {
    res.status(404).json({ message: 'Không tìm thấy hộ khẩu' })
    return
  }

  const total = await Household.count()

  res.json({ data: households, total })
})

/**
 * @desc Create household by pages
 * @route POST /households
 * @access Public
 */
export const createHousehold: RequestHandler = asyncHandler(async (req, res) => {
  const requestBody = req.body

  const chu_ho = await Resident.findById(requestBody.idChuHo)

  const household = await Household.create({
    maHoKhau: requestBody.maHoKhau,
    maKhuVuc: requestBody.maKhuVuc,
    diaChi: requestBody.diaChi,
    thanhVienHo: requestBody.nhanKhaus.reduce(
      (members: any[], item: any) => {
        members.push(item.id)
        return members
      },
      [requestBody.idChuHo]
    ),
    chu_ho: chu_ho
  })

  requestBody.nhanKhaus.forEach(async (item: any) => {
    await Resident.findByIdAndUpdate(item.id, {
      thanhVienHo: household._id,
      quanHeVoiChuHo: item.quanHeVoiChuHo
    })
  })

  await Resident.findByIdAndUpdate(requestBody.idChuHo, {
    quanHeVoiChuHo: 'Chủ hộ',
    thanhVienHo: household._id
  })

  res.json(await Household.findById(household._id).populate('thanhVienHo').lean())
})

/**
 * @desc Update household
 * @route PUT /households/:id
 * @access Public
 */
export const editHousehold: RequestHandler = asyncHandler(async (req, res) => {
  const id = req.params.id
  const requestBody = req.body

  const oldHousehold = await Household.findById(id).populate(['thanhVienHo', 'chu_ho']).lean()

  let thongTinThayDoi: string[] = []
  let thayDoiTu: string[] = []
  let thayDoiThanh: string[] = []

  if (oldHousehold?.maKhuVuc !== requestBody.maKhuVuc) {
    thongTinThayDoi.push('maKhuVuc')
    thayDoiTu.push(oldHousehold?.maKhuVuc ?? '')
    thayDoiThanh.push(requestBody.maKhuVuc)
  }

  if (oldHousehold?.diaChi !== requestBody.diaChi) {
    thongTinThayDoi.push('diaChi')
    thayDoiTu.push(oldHousehold?.diaChi ?? '')
    thayDoiThanh.push(requestBody.diaChi)
  }

  if (`${oldHousehold?.chu_ho}` !== requestBody.idChuHo) {
    thongTinThayDoi.push('idChuHo')
    thayDoiTu.push(`${(oldHousehold?.chu_ho as any).hoTen}` ?? '')
    thayDoiThanh.push((await Resident.findById(requestBody.idChuHo).lean())?.hoTen as string)
  }

  ChangeLog.create({
    thongTinThayDoi: thongTinThayDoi.join(';'),
    thayDoiTu: thayDoiTu.join(';'),
    thayDoiThanh: thayDoiThanh.join(';'),
    idHoKhau: id
  })

  requestBody.nhan_khaus.forEach(async (item: any) => {
    await Resident.findByIdAndUpdate(item.id, { quanHeVoiChuHo: item.quanHeVoiChuHo })
  })

  await Resident.findByIdAndUpdate(requestBody.idChuHo, { quanHeVoiChuHo: 'Chủ hộ' })

  const household = await Household.findByIdAndUpdate(id, {
    diaChi: requestBody.diaChi,
    maKhuVuc: requestBody.maKhuVuc,
    chu_ho: requestBody.idChuHo,
    thanhVienHo: requestBody.nhan_khaus.reduce(
      (members: any[], item: any) => {
        members.push(item.id)
        return members
      },
      [requestBody.idChuHo]
    )
  }).populate(['thanhVienHo', 'chu_ho'])

  res.json({ data: household })
})

export const changeLog: RequestHandler = asyncHandler(async (req, res) => {
  const id = req.params.id

  const changeLogs = await ChangeLog.find({ idHoKhau: id }).sort({ ngayThayDoi: -1 }).lean()

  res.json({ data: changeLogs, total: changeLogs.length })
})
