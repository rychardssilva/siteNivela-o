import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, contact, subject, message } = await request.json();

    if (!name || !contact || !subject || !message) {
      return NextResponse.json(
        { error: 'Todos os campos são obrigatórios.' },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST, 
      port: Number(process.env.EMAIL_PORT) || 587,
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const emailText = `Olá, me chamo ${name}. <br><br>${message} <br><br>Aguardo retorno em ${contact}`;

    await transporter.sendMail({
      from: `"${name}" <${process.env.EMAIL_USER}>`, 
      to: process.env.EMAIL_RECEIVER || process.env.EMAIL_USER,
      subject: subject,
      text: emailText, 
      html: `<p style="font-family: sans-serif; font-size: 16px; line-height: 1.5;">${emailText}</p>`,
    });

    return NextResponse.json({ success: true, message: 'E-mail enviado com sucesso!' });
  } catch (error) {
    console.error('Erro na rota de contato:', error);
    return NextResponse.json(
      { error: 'Ocorreu um erro interno ao tentar enviar o e-mail.' },
      { status: 500 }
    );
  }
}