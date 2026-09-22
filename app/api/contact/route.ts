// app/api/contact/route.ts
//
// Receives the "Tez murojaat qoldiring" form and relays it to Telegram
// via the Bot API — no extra service needed. Create a bot with
// @BotFather, add it to your group/channel, and set:
//
//   TELEGRAM_BOT_TOKEN=123456:ABC-your-bot-token
//   TELEGRAM_CHAT_ID=-1001234567890
//
// If you'd rather store leads in Directus instead of (or as well as)
// Telegram, POST the same payload to
// `${DIRECTUS_URL}/items/leads` with the service token — see the
// commented block below.

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { name, phone, car_model, message } = await request.json();

  if (!name || !phone) {
    return NextResponse.json(
      { error: "Ism va telefon raqami majburiy." },
      { status: 400 }
    );
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    return NextResponse.json(
      { error: "TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID sozlanmagan." },
      { status: 500 }
    );
  }

  const text = [
    "🚗 Yangi murojaat — Avtochexol.uz",
    `Ism: ${name}`,
    `Telefon: ${phone}`,
    car_model ? `Model: ${car_model}` : null,
    message ? `Xabar: ${message}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  const res = await fetch(
    `https://api.telegram.org/bot${botToken}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text }),
    }
  );

  if (!res.ok) {
    return NextResponse.json(
      { error: "Telegramga yuborilmadi." },
      { status: 502 }
    );
  }

  // Optional: also log the lead into Directus.
  // await fetch(`${process.env.DIRECTUS_URL}/items/leads`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${process.env.DIRECTUS_TOKEN}`,
  //   },
  //   body: JSON.stringify({ name, phone, car_model, message }),
  // });

  return NextResponse.json({ ok: true });
}
