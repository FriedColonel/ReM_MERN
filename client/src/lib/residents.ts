import axiosClient from '~/app/axiosClient'

export const getResidentsByPage = async ({ page, offset }: Page) => {
  const response = await axiosClient.get(`/residents?page=${page}&limit=${offset}`)
  if (!response) return

  const residents = (response.data as IResident[]).reduce(
    (acc: Map<string, IResident>, resident: IResident) => {
      acc.set(resident._id, resident)

      return acc
    },
    new Map<string, IResident>()
  )

  return { data: residents, total: response.total }
}

export const getResidentById = async (id: string) => {
  const response = await axiosClient.get(`/residents/${id}`)

  if (!response) return

  return response.data
}

export const createResident = async (
  resident: IResident,
  residentHousehold: ResidentHousehold,
  cmt: IdentificationType,
  isMoiSinh?: boolean
) => {
  let queryString = '/residents'
  let ghiChu = resident.ghiChu
  if (isMoiSinh) {
    queryString = '/residents?moiSinh=true'
    ghiChu = 'Mới sinh'
  }

  const response = await axiosClient.post(queryString, {
    idHoKhau: residentHousehold.idHoKhau,
    quanHeVoiChuHo: residentHousehold.quanHeVoiChuHo,
    nhanKhau: {
      ...resident,
      ghiChu
    },
    cmt: {
      ...cmt
    }
  })

  if (!response) return

  return response.data
}

export const searchResident = async (searchValue: string) => {
  const response = await axiosClient.get(`/residents?hoTen=${searchValue}`)

  if (!response) return

  return response.data as IResident[]
}

export const khaiTuResident = async (id: string, khaiTuData: KhaiTuData) => {
  const response = await axiosClient.post(`/nhan-khau/${id}/khai-tu`, khaiTuData)

  if (!response) return

  return response.data
}

export const editResident = async (resident: IResident) => {
  const response = await axiosClient.put(`/residents/${resident._id}`, resident)

  if (!response) return

  return response.data
}

export const searchHouseholdLeader = async (searchValue: string) => {
  const response = await axiosClient.get(`/residents/chu-ho?hoTen=${searchValue}`)

  if (!response) return

  return response.data as IHousehold[]
}
