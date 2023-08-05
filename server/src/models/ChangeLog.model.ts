import mongoose, { Date, Document, Model, Schema } from 'mongoose'

export interface ChangeLogType extends Document {
  idHoKhau: mongoose.Schema.Types.ObjectId
  thongTinThayDoi: string
  thayDoiTu: string
  thayDoiThanh: string
  ngayThayDoi: Date
  nguoiThayDoi: mongoose.Schema.Types.ObjectId
}

const useSchema: Schema<ChangeLogType> = new mongoose.Schema({
  idHoKhau: { type: mongoose.Schema.Types.ObjectId, ref: 'HoKhau', required: true },
  thongTinThayDoi: { type: String, required: true },
  thayDoiTu: { type: String, required: true },
  thayDoiThanh: { type: String, required: true },
  ngayThayDoi: { type: Date, default: Date.now },
  nguoiThayDoi: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

const ChangeLog: Model<ChangeLogType> = mongoose.model<ChangeLogType>('DinhChinh', useSchema)

export default ChangeLog
