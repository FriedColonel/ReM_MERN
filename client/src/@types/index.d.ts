declare type ApiError = {
  status: number
  data: {
    message: string
  }
}

declare type Page = {
  page: number
  offset: number
}

declare type IResident = {
  _id: string
  maNhanKhau: string
  image?: string
  hoTen: string
  biDanh?: string
  gioiTinh: number
  noiSinh: string
  ngaySinh: Date
  nguyenQuan: string
  diaChiThuongTru: string
  diaChiHienTai: string
  danToc: string
  quocTich: string
  tonGiao: string
  soHoChieu?: string
  trinhDoHocVan: string
  ngheNghiep?: string
  noiLamViec?: string
  tienAn?: string
  ngayChuyenDen?: Date
  lyDoChuyenDen?: string
  ngayChuyenDi?: Date
  lyDoChuyenDi?: string
  diaChiMoi?: string
  idNguoiTao: string
  status: int
  idNguoiXoa?: string
  lyDoXoa?: string
  ghiChu?: string
  created_at: Date
  updated_at: Date
  quanHeVoiChuHo: string
  duoc_khai_tu: Death | null
  cmt?: IdentificationType
  thanhVienHo?: IHousehold
  age: number
}

declare type Death = {
  _id: string
  idNguoiKhaiTu: string
  idNguoiTao: string
  soGiayKhaiTu: string
  ngayChet: Date
  lyDoChet: string
  created_at: Date
  updated_at: Date
}

declare type IHousehold = {
  _id: string
  maHoKhau?: string
  idChuHo: string
  maKhuVuc?: string
  ngayLap?: Date
  diaChi?: string
  ngayChuyenDi?: Date
  lyDoChuyen?: string
  created_at?: Date
  updated_at?: Date
  chu_ho: IResident
  thanhVienHo: IResident[]
}

declare type Residents = Map<string, IResident>

declare type KhaiTuData = {
  soGiayKhaiTu: string
  ngayChet: Date
  lyDoChet: string
  idNguoiTao: string
  idNguoiKhaiTu: string
}
declare type Residents = Map<string, IResident>

declare type CredentialsType = {
  username: string
  password: string
}

declare type GenderType = 'Nam' | 'Nữ' | 'Khác'

declare type HouseholdRelationshipType =
  | 'Vợ'
  | 'Chồng'
  | 'Con'
  | 'Cháu'
  | 'Ông'
  | 'Bà'
  | 'Bố'
  | 'Mẹ'
  | 'Anh'
  | 'Chị'
  | 'Em'
  | 'Phức tạp'

declare type IdentificationType = {
  soCMT: string
  ngayCap: Date
  noiCap: string
}

declare type ResidentHousehold = {
  idHoKhau: number
  idNhanKhau?: number
  quanHeVoiChuHo: HouseholdRelationshipType
}

declare type ITamTru = {
  _id: string
  idNhanKhau: string
  maGiayTamTru: string
  soDienThoaiDangKy: string
  tuNgay: Date
  denNgay: Date
  lyDo: string
  nhan_khau: IResident
}

declare type TamTrus = Map<string, ITamTru>

declare type ITamVang = {
  _id: string
  idNhanKhau: string
  maGiayTamVang: string
  noiTamTru: string
  tuNgay: Date
  denNgay: Date
  lyDo: string
  nhan_khau: IResident
}

declare type TamVangs = Map<string, ITamVang>

declare type ChangeLogType = {
  idHoKhau: string
  thongTinThayDoi: string
  thayDoiTu: string
  thayDoiThanh: string
  ngayThayDoi: Date
  nguoi_thay_doi: {
    name: string
    _id: string
  }
}

// declare type StaticByAgeType = {
//   '0-4': number
//   '5-9': number
//   '10-14': number
//   '15-19': number
//   '20-24': number
//   '25-29': number
//   '30-34': number
//   '35-39': number
//   '40-44': number
//   '45-49': number
//   '50-54': number
//   '55-59': number
//   '60-64': number
//   '65-69': number
//   '70-74': number
//   '75-79': number
//   '80-84': number
//   '85-89': number
//   '90-94': number
//   '95-99': number
//   '100+': number
// }

declare type StaticByGenderType = {
  namGioi: number
  nuGioi: number
}

declare type StaticByTempResidentType = {
  tamTru: number
  tamVang: number
}
