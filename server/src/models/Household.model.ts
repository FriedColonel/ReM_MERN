import mongoose, { Date, Document, Model, Schema } from 'mongoose'

export interface HouseholdType extends Document {
  maHoKhau: string
  maKhuVuc: string
  diaChi: string
  ngayLap: Date
  ngayChuyenDi: Date
  lyDoChuyen: string
  chu_ho: mongoose.Schema.Types.ObjectId
  thanhVienHo?: mongoose.Schema.Types.ObjectId[]
}

const useSchema: Schema<HouseholdType> = new mongoose.Schema(
  {
    maHoKhau: { type: String, required: true },
    maKhuVuc: { type: String, required: true },
    diaChi: { type: String, required: true },
    ngayLap: { type: Date, default: Date.now },
    ngayChuyenDi: { type: Date },
    lyDoChuyen: { type: String },
    chu_ho: { type: mongoose.Schema.Types.ObjectId, ref: 'NhanKhau', required: true },
    thanhVienHo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'NhanKhau' }]
  },
  { timestamps: true }
)

const Household: Model<HouseholdType> = mongoose.model<HouseholdType>('HoKhau', useSchema)
export default Household
