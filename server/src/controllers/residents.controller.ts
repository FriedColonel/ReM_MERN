import { RequestHandler } from 'express'
import asyncHandler from 'express-async-handler'
import Household from '~/models/Household.model'
import Resident, { IResident } from '~/models/Resident.model'

/**
 * @desc Get residents by pages
 * @route GET /residents
 * @access Public
 */
export const getResidentsByPage: RequestHandler = asyncHandler(async (req, res) => {
  const { page, limit, hoTen } = req.query

  const residents = await Resident.find({
    hoTen: { $regex: new RegExp((hoTen as string) ?? '', 'i') }
  })
    .sort({ updatedAt: -1 })
    .skip((parseInt((page as string) ?? 1) - 1) * parseInt((limit as string) ?? 10))
    .limit(parseInt((limit as string) ?? 10))
    .populate(['cmt', 'thanhVienHo'])

  const total = await Resident.count()

  res.json({ data: residents, total })
})

/**
 * @desc Create new resident
 * @route POST /residents
 * @access Public
 */
export const createResident: RequestHandler = asyncHandler(async (req, res) => {
  const isMoiSinh = req.query.moiSinh
  const requestBody = req.body

  let resident: IResident

  if (isMoiSinh !== 'true') {
    resident = await Resident.create({
      ...requestBody.nhanKhau,
      thanhVienHo: requestBody.idHoKhau,
      cmt: requestBody.cmt
    })
  } else {
    resident = await Resident.create({ ...requestBody.nhanKhau })
  }
  await Household.findByIdAndUpdate(requestBody.idHoKhau, { $push: { thanhVienHo: resident._id } })
  res.json({ data: await Resident.findById(resident._id).populate(['cmt', 'thanhVienHo']).lean() })
})

/**
 * @desc get resident by id
 * @route GET /residents/:id
 * @access Public
 */
export const getResidentById: RequestHandler = asyncHandler(async (req, res) => {
  const { id } = req.params
  const resident = await Resident.findById(id).populate('cmt')
  const household = await Household.findById(resident?.thanhVienHo).populate('chu_ho')

  res.json({ data: { ...resident?.toObject(), thanhVienHo: household?.toObject() } })
})

/**
 * @desc search residents by name chu ho
 * @route GET /residents/chu-ho?hoTen=...
 * @access Public
 */
export const filterResidentChuHo: RequestHandler = asyncHandler(async (req, res) => {
  const hoTen = req.query.hoTen

  const residents = await Resident.find({
    quanHeVoiChuHo: 'Chủ hộ',
    hoTen: { $regex: new RegExp((hoTen as string) ?? '', 'i') }
  })
    .populate('thanhVienHo')
    .lean()

  res.json({
    data: residents.map(resident => ({
      ...resident.thanhVienHo,
      chu_ho: { hoTen: resident.hoTen }
    }))
  })
})

export const editResident: RequestHandler = asyncHandler(async (req, res) => {
  const { id } = req.params
  const requestBody = req.body

  const resident = await Resident.findByIdAndUpdate(id, {
    maNhanKhau: requestBody.maNhanKhau,
    hoTen: requestBody.hoTen,
    biDanh: requestBody.biDanh,
    ngaySinh: requestBody.ngaySinh,
    gioiTinh: requestBody.gioiTinh,
    quanHeVoiChuHo: requestBody.quanHeVoiChuHo,
    noiSinh: requestBody.noiSinh,
    nguyenQuan: requestBody.nguyenQuan,
    diaChiThuongTru: requestBody.diaChiThuongTru,
    diaChiHienTai: requestBody.diaChiHienTai,
    trinhDoHocVan: requestBody.trinhDoHocVan,
    ngheNghiep: requestBody.ngheNghiep,
    noiLamViec: requestBody.noiLamViec,
    soHoChieu: requestBody.soHoChieu,
    thanhVienHo: requestBody.idHoKhau.value,
    cmt: {
      soCMT: requestBody.soCMT,
      ngayCap: requestBody.ngayCap,
      noiCap: requestBody.noiCap
    }
  })

  res.json({ data: await Resident.findById(id).populate(['thanhVienHo']) })
})
