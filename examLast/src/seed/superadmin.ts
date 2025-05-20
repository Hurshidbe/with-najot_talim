import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';

dotenv.config({ path: '../../.env' });

const prisma = new PrismaClient();

async function yaratish() {
  const superAdminPassword = process.env.superAdminPassword;
  const superAdminEmail = process.env.superAdminEmail;
  const superAdminUsername = process.env.SuperadminUsername;

  if (!superAdminUsername || !superAdminEmail || !superAdminPassword) {
    throw new Error('Env fayldan SUPERADMIN_* qiymatlar topilmadi!');
  }

  const hashedPass = await bcrypt.hash(superAdminPassword, 12);

  await prisma.user.upsert({
    where: { email: superAdminEmail },
    update: {},
    create: {
      username: superAdminUsername,
      email: superAdminEmail,
      password_hash: hashedPass,
      role: 'Superadmin',
      avatar_url: 'default pic',
    },
  });

  console.log(
    'Superadmin databasaga muvaffaqiyatli saqlandi yoki allaqachon mavjud(urug` ekildi)',
  );
}

yaratish()
  .catch((e) => {
    console.error('Xatolik:', e.message);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
