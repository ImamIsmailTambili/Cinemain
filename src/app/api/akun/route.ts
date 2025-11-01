import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { hash } from "bcrypt"
import * as z from "zod"

// schema validation
const userSchema = z
  .object({
    nama: z
      .string()
      .min(1, "Tolong Masukkan Nama Anda"),
    telepon: z
      .string()
      .regex(/^08[0-9]+$/, "Nomor telepon hanya angka dan harus dimulai dengan 08")
      .min(10, "No Telepon minimal 10 digit")
      .max(13, "No Telepon maksimal 13 digit"),
    email: z
      .string("Tolong Masukkan Email")
      .email("Email Salah"),
    gender: z
      .string()
      .min(1, "Pilih jenis kemain anda")
      .refine((val) => val === "Pria" || val === "Wanita", "Pilih jenis kelamin"),
    tanggalLahir: z
      .string("Pilih tanggal Lahir anda")
      .refine((val) => !isNaN(Date.parse(val))),
    pin: z
      .string()
      .regex(/^[0-9]+$/, "PIN hanya angka")
      .min(6, "PIN hanya boleh 6 angka")
      .max(6, "PIN hanya boleh 6 angka"),
  })

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { nama, telepon, email, gender, tanggalLahir, pin } = userSchema.parse(body)

    // Check email sudah ada atau tidak
    const existingUserByEmail = await prisma.user.findUnique({
      where: { email: email }
    })
    if (existingUserByEmail) {
      return NextResponse.json({ user: null, message: "Email sudah digunakan" }, { status: 409 })
    }

    // Check telepon sudah ada atau tidak
    const existingUserByTelepon = await prisma.user.findUnique({
      where: { telepon: telepon }
    })
    if (existingUserByTelepon) {
      return NextResponse.json({ user: null, message: "Telepon sudah digunakan" }, { status: 409 })
    }

    const hashedPin = await hash(pin, 10)
    const newUser = await prisma.user.create({
      data: {
        nama,
        telepon,
        email,
        gender,
        tanggalLahir: new Date(tanggalLahir),
        pin: hashedPin
      }
    })
    const { pin: newUserPin, ...rest } = newUser;

    return NextResponse.json({ user: rest, massage: "User berhasil dibuat" }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ massage: "User gagal dibuat" }, { status: 500 })
  }
}
