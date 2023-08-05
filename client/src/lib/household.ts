import axiosClient from '~/app/axiosClient'

export const getHouseholdByPage = async (page: Page) => {
  const response = await axiosClient.get(`/households?page=${page.page}&limit=${page.offset}`)
  if (!response) return
  return response
}

export const getHouseholdById = async (id: string) => {
  const response = await axiosClient.get(`/households/${id}`)
  if (!response) return
  return response.data
}

export const createHousehold = async (household: any) => {
  const response = await axiosClient.post(`/households`, household)
  if (!response) return
  return response.data
}

export const updateHousehold = async (household: any) => {
  const response = await axiosClient.put(`/households/${household._id}`, household)
  if (!response) return
  return response.data
}

export const splitHousehold = async (id: string, data: any) => {
  const response = await axiosClient.post(`/ho-khau/${id}/edit/tach-ho-khau`, data)
  if (!response) return
  return response.data
}

export const getChangeLog = async (id: string, page: Page) => {
  const response = await axiosClient.get(
    `/households/${id}/lich-su?page=${page.page}&limit=${page.offset}`
  )
  if (!response) return
  return response
}
