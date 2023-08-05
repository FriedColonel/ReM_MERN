import mongoose, { Date, Document, Model, Schema } from 'mongoose'

interface IKhaiTu {
  soGiayKhaiTu: string
  nguoiKhaiTu: mongoose.Schema.Types.ObjectId
  ngayChet: Date
  lyDoChet: string
}

interface ITamTru {
  maGiayTamTru: string
  soDienThoaiDangKy: string
  tuNgay: Date
  denNgay: Date
  lyDo: string
}

interface ITamVang {
  maGiayTamVang: string
  noiTamTru: string
  tuNgay: Date
  denNgay: Date
  lyDo: string
}

interface ICredential {
  soCMT: string
  ngayCap: Date
  noiCap: string
}

export interface IResident extends Document {
  maNhanKhau: string
  image: string
  hoTen: string
  biDanh: string
  gioiTinh: 0 | 1
  noiSinh: string
  ngaySinh: Date
  nguyenQuan: string
  diaChiThuongTru: string
  diaChiHienTai: string
  danToc: string
  quocTich: string
  tonGiao: string
  soHoChieu: string
  trinhDoHocVan: string
  ngheNghiep: string
  noiLamViec: string
  tienAn: string
  ghiChu: string
  cmt: ICredential
  thanhVienHo: mongoose.Schema.Types.ObjectId
  quanHeVoiChuHo: string
  khaiTu: IKhaiTu
  tamTru: ITamTru
  tamVang: ITamVang
}

const useSchema: Schema<IResident> = new mongoose.Schema(
  {
    maNhanKhau: {
      type: String,
      required: true
    },
    image: { type: String },
    hoTen: { type: String, required: true },
    biDanh: { type: String },
    gioiTinh: { type: Number, required: true },
    noiSinh: { type: String },
    ngaySinh: { type: Date, required: true },
    nguyenQuan: { type: String },
    diaChiThuongTru: { type: String },
    diaChiHienTai: { type: String },
    danToc: { type: String },
    quocTich: { type: String },
    tonGiao: { type: String },
    soHoChieu: { type: String },
    trinhDoHocVan: { type: String },
    ngheNghiep: { type: String },
    noiLamViec: { type: String },
    tienAn: { type: String },
    cmt: new Schema<ICredential>(
      {
        soCMT: { type: String, required: true, unique: true },
        ngayCap: { type: Date, required: true },
        noiCap: { type: String, required: true }
      },
      { _id: false }
    ),
    khaiTu: new Schema<IKhaiTu>(
      {
        soGiayKhaiTu: { type: String, required: true, unique: true },
        nguoiKhaiTu: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'NhanKhau' },
        ngayChet: { type: Date, required: true },
        lyDoChet: { type: String, required: true }
      },
      { _id: false }
    ),
    tamTru: new Schema<ITamTru>(
      {
        maGiayTamTru: { type: String, required: true, unique: true },
        tuNgay: { type: Date, required: true },
        denNgay: { type: Date, required: true },
        lyDo: { type: String, required: true },
        soDienThoaiDangKy: { type: String, required: true }
      },
      { _id: false }
    ),
    tamVang: new Schema<ITamVang>(
      {
        maGiayTamVang: { type: String, required: true, unique: true },
        noiTamTru: { type: String, required: true },
        tuNgay: { type: Date, required: true },
        denNgay: { type: Date, required: true },
        lyDo: { type: String, required: true }
      },
      { _id: false }
    ),
    thanhVienHo: { type: mongoose.Schema.Types.ObjectId, ref: 'HoKhau' },
    quanHeVoiChuHo: { type: String },
    ghiChu: { type: String }
  },
  {
    timestamps: true,
    virtuals: {
      age: {
        get() {
          return Math.floor((Date.now() - (this.ngaySinh as any)) / 31557600000)
        }
      }
    },
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret.id
        delete ret.__v
      }
    },
    toObject: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret.id
        delete ret.__v
      }
    }
  }
)

const Resident: Model<IResident> = mongoose.model<IResident>('NhanKhau', useSchema)
export default Resident
