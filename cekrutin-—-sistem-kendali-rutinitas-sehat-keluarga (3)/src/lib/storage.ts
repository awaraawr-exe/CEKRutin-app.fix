import {CekRutinStore, DailyRoutineLog, FaskesVisit} from '../types/health';

const DB_NAME = 'cekrutin_offline_db';
const DB_VERSION = 1;
const STORE_NAME = 'app_state';

export function getTodayDateString(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function getDateOffset(daysAgo: number): string {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export interface ManagerSeedIdentity {
  uid?: string;
  name?: string | null;
  email?: string | null;
  photoUrl?: string | null;
}

export function createDefaultStore(identity?: ManagerSeedIdentity): CekRutinStore {
  const today = getTodayDateString();
  const nextWeek = getDateOffset(-5);
  const nextTwoWeeks = getDateOffset(-12);

  const managerName = identity?.name?.trim() || 'Ibu Sari Rahmawati';
  const managerEmail = identity?.email?.trim() || '';

  return {
    manager: {
      id: identity?.uid || 'mgr-1',
      name: managerName,
      email: managerEmail,
      photoUrl: identity?.photoUrl || undefined,
      city: 'Kota Bandung',
      puskesmasName: 'Puskesmas Sukajadi',
      pinEnabled: false,
      pinCode: '1234',
      isLocked: false,
      createdAt: new Date().toISOString(),
    },
    members: [
      {
        id: 'mem-ibu',
        name: identity?.name?.trim() ? `${identity.name.trim()} (Pengelola)` : 'Sari Rahmawati',
        role: 'Ibu',
        age: 38,
        gender: 'Perempuan',
        targetWaterGlasses: 8,
        targetFruitVegPortions: 5,
        targetActivityMinutes: 15,
        medicalNote: 'Pengelola kesehatan keluarga · Aktif Posbindu',
        createdAt: getDateOffset(30),
      },
      {
        id: 'mem-ayah',
        name: 'Budi Santoso',
        role: 'Ayah',
        age: 42,
        gender: 'Laki-laki',
        targetWaterGlasses: 9,
        targetFruitVegPortions: 5,
        targetActivityMinutes: 15,
        medicalNote: 'Pantau tekanan darah & kolesterol berkala',
        createdAt: getDateOffset(30),
      },
      {
        id: 'mem-lansia',
        name: 'Nenek Aminah',
        role: 'Lansia',
        age: 67,
        gender: 'Perempuan',
        targetWaterGlasses: 7,
        targetFruitVegPortions: 5,
        targetActivityMinutes: 10,
        medicalNote: 'Riwayat hipertensi ringan · Kontrol rutin Puskesmas',
        createdAt: getDateOffset(30),
      },
      {
        id: 'mem-anak',
        name: 'Raka Pratama',
        role: 'Anak',
        age: 11,
        gender: 'Laki-laki',
        targetWaterGlasses: 6,
        targetFruitVegPortions: 4,
        targetActivityMinutes: 15,
        medicalNote: 'Pembiasaan minum air putih & makan buah harian',
        createdAt: getDateOffset(30),
      },
    ],
    activeMemberId: 'mem-ibu',
    routineLogs: [
      {
        id: `log-mem-ibu-${today}`,
        memberId: 'mem-ibu',
        date: today,
        waterGlasses: 5,
        fruitPortions: 2,
        vegetablePortions: 2,
        activities: [
          {
            id: 'act-1',
            label: 'Peregangan Pagi',
            minutes: 5,
            loggedAt: new Date().toISOString(),
          },
        ],
      },
      {
        id: `log-mem-ibu-${getDateOffset(1)}`,
        memberId: 'mem-ibu',
        date: getDateOffset(1),
        waterGlasses: 8,
        fruitPortions: 2,
        vegetablePortions: 3,
        activities: [
          {
            id: 'act-2',
            label: 'Jalan Kaki Ringan',
            minutes: 15,
            loggedAt: new Date().toISOString(),
          },
        ],
      },
      {
        id: `log-mem-ayah-${today}`,
        memberId: 'mem-ayah',
        date: today,
        waterGlasses: 4,
        fruitPortions: 1,
        vegetablePortions: 2,
        activities: [],
      },
      {
        id: `log-mem-lansia-${today}`,
        memberId: 'mem-lansia',
        date: today,
        waterGlasses: 4,
        fruitPortions: 2,
        vegetablePortions: 1,
        activities: [
          {
            id: 'act-3',
            label: 'Senam Kursi Lansia',
            minutes: 10,
            loggedAt: new Date().toISOString(),
          },
        ],
      },
    ],
    healthChecks: [
      {
        id: 'hc-ibu-1',
        memberId: 'mem-ibu',
        recordedAt: `${getDateOffset(28)}T08:15:00`,
        systolic: 118,
        diastolic: 76,
        glucose: 94,
        glucoseType: 'puasa',
        cholesterol: 184,
        weightKg: 58,
        heightCm: 159,
        bmi: 22.9,
        overallStatus: 'normal',
        notes: 'Cek rutin Posbindu bulan lalu',
      },
      {
        id: 'hc-ibu-2',
        memberId: 'mem-ibu',
        recordedAt: `${getDateOffset(14)}T08:30:00`,
        systolic: 116,
        diastolic: 74,
        glucose: 91,
        glucoseType: 'puasa',
        cholesterol: 179,
        weightKg: 57.5,
        heightCm: 159,
        bmi: 22.7,
        overallStatus: 'normal',
        notes: 'Rutin jalan pagi 10 menit',
      },
      {
        id: 'hc-ibu-3',
        memberId: 'mem-ibu',
        recordedAt: `${getDateOffset(2)}T07:50:00`,
        systolic: 114,
        diastolic: 74,
        glucose: 89,
        glucoseType: 'puasa',
        cholesterol: 175,
        weightKg: 57.2,
        heightCm: 159,
        bmi: 22.6,
        overallStatus: 'normal',
        notes: 'Kondisi bugar, konsumsi air terjaga',
      },
      {
        id: 'hc-ayah-1',
        memberId: 'mem-ayah',
        recordedAt: `${getDateOffset(25)}T09:00:00`,
        systolic: 128,
        diastolic: 84,
        glucose: 108,
        glucoseType: 'puasa',
        cholesterol: 218,
        weightKg: 76,
        heightCm: 170,
        bmi: 26.3,
        overallStatus: 'waspada',
        notes: 'Kurang tidur dan sering makan gorengan',
      },
      {
        id: 'hc-ayah-2',
        memberId: 'mem-ayah',
        recordedAt: `${getDateOffset(10)}T08:40:00`,
        systolic: 126,
        diastolic: 82,
        glucose: 104,
        glucoseType: 'puasa',
        cholesterol: 208,
        weightKg: 75,
        heightCm: 170,
        bmi: 26.0,
        overallStatus: 'waspada',
        notes: 'Mulai kurangi garam dan jalan kaki sore',
      },
      {
        id: 'hc-ayah-3',
        memberId: 'mem-ayah',
        recordedAt: `${getDateOffset(1)}T08:20:00`,
        systolic: 124,
        diastolic: 80,
        glucose: 101,
        glucoseType: 'puasa',
        cholesterol: 202,
        weightKg: 74.5,
        heightCm: 170,
        bmi: 25.8,
        overallStatus: 'waspada',
        notes: 'Tren membaik, lanjutkan pantau kolesterol',
      },
      {
        id: 'hc-lansia-1',
        memberId: 'mem-lansia',
        recordedAt: `${getDateOffset(21)}T08:10:00`,
        systolic: 148,
        diastolic: 92,
        glucose: 132,
        glucoseType: 'sewaktu',
        cholesterol: 215,
        weightKg: 54,
        heightCm: 152,
        bmi: 23.4,
        overallStatus: 'konsultasi',
        notes: 'Tekanan darah agak tinggi, dijadwalkan ke Puskesmas',
      },
      {
        id: 'hc-lansia-2',
        memberId: 'mem-lansia',
        recordedAt: `${getDateOffset(7)}T08:05:00`,
        systolic: 142,
        diastolic: 88,
        glucose: 128,
        glucoseType: 'sewaktu',
        cholesterol: 205,
        weightKg: 54,
        heightCm: 152,
        bmi: 23.4,
        overallStatus: 'konsultasi',
        notes: 'Sudah mulai minum obat rutin sesuai anjuran dokter Puskesmas',
      },
    ],
    reminders: [
      {
        id: 'rem-1',
        memberId: 'mem-ibu',
        title: 'Minum 2 Gelas Air Putih Siang',
        category: 'air',
        time: '12:30',
        enabled: true,
      },
      {
        id: 'rem-2',
        memberId: 'mem-ayah',
        title: 'Aktivitas Mikro Jalan Kaki 10 Menit',
        category: 'aktivitas',
        time: '17:00',
        enabled: true,
      },
      {
        id: 'rem-3',
        memberId: 'mem-lansia',
        title: 'Cek Tekanan Darah Pagi Nenek',
        category: 'cek_medis',
        time: '07:30',
        enabled: true,
      },
    ],
    faskesVisits: [
      {
        id: 'vis-1',
        memberId: 'mem-lansia',
        facilityName: 'Puskesmas Sukajadi (Poli Lansia)',
        serviceType: 'Kontrol Tekanan Darah & Obat Rutin',
        date: nextWeek,
        time: '08:30',
        notes: 'Bawa buku pemantauan hipertensi & hasil catatan CEKRutin.',
        completed: false,
      },
      {
        id: 'vis-2',
        memberId: 'mem-ayah',
        facilityName: 'Posbindu PTM RW 04',
        serviceType: 'Cek Kolesterol & Gula Darah Puasa',
        date: nextTwoWeeks,
        time: '08:00',
        notes: 'Puasa 8–10 jam malam sebelumnya (boleh minum air putih).',
        completed: false,
      },
    ],
    certificates: [],
  };
}

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !('indexedDB' in window)) {
      reject(new Error('IndexedDB not supported'));
      return;
    }
    const req = window.indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function loadCekRutinStore(identity?: ManagerSeedIdentity): Promise<CekRutinStore> {
  const uid = identity?.uid || 'default';
  const stateKey = `primary_store_${uid}`;
  const lsKey = `cekrutin_offline_store_v1_${uid}`;

  try {
    const db = await openDatabase();
    const result = await new Promise<CekRutinStore | undefined>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(stateKey);
      req.onsuccess = () => resolve(req.result as CekRutinStore | undefined);
      req.onerror = () => reject(req.error);
    });
    if (result && Array.isArray(result.members) && result.members.length > 0) {
      return result;
    }
  } catch {
    // Fallback to localStorage below
  }

  try {
    const raw = window.localStorage.getItem(lsKey);
    if (raw) {
      const parsed = JSON.parse(raw) as CekRutinStore;
      if (parsed && Array.isArray(parsed.members) && parsed.members.length > 0) {
        return parsed;
      }
    }
  } catch {
    // Use seed store
  }

  const seeded = createDefaultStore(identity);
  await saveCekRutinStore(seeded, uid);
  return seeded;
}

export async function saveCekRutinStore(storeData: CekRutinStore, uid = 'default'): Promise<void> {
  const stateKey = `primary_store_${uid}`;
  const lsKey = `cekrutin_offline_store_v1_${uid}`;

  try {
    window.localStorage.setItem(lsKey, JSON.stringify(storeData));
  } catch {
    // Ignore storage quota errors
  }

  try {
    const db = await openDatabase();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(storeData, stateKey);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch {
    // localStorage mirror already saved
  }
}

export function getOrCreateRoutineLog(
  logs: DailyRoutineLog[],
  memberId: string,
  date: string,
): DailyRoutineLog {
  const existing = logs.find((l) => l.memberId === memberId && l.date === date);
  if (existing) return existing;
  return {
    id: `log-${memberId}-${date}`,
    memberId,
    date,
    waterGlasses: 0,
    fruitPortions: 0,
    vegetablePortions: 0,
    activities: [],
  };
}

export function calculateMemberStreak(logs: DailyRoutineLog[], memberId: string): number {
  const memberLogs = logs.filter((l) => l.memberId === memberId);
  let streak = 0;
  for (let i = 0; i < 30; i++) {
    const dateStr = getDateOffset(i);
    const log = memberLogs.find((l) => l.date === dateStr);
    const hasActivity =
      log &&
      (log.waterGlasses > 0 ||
        log.fruitPortions + log.vegetablePortions > 0 ||
        log.activities.length > 0);
    if (hasActivity) {
      streak++;
    } else if (i > 0) {
      break;
    }
  }
  return streak;
}

export function downloadVisitIcsFile(visit: FaskesVisit, memberName: string): void {
  const cleanDate = visit.date.replace(/-/g, '');
  const cleanTime = visit.time.replace(':', '') + '00';
  const startStamp = `${cleanDate}T${cleanTime}`;
  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//CEKRutin//Agenda Kesehatan Keluarga//ID',
    'BEGIN:VEVENT',
    `UID:${visit.id}@cekrutin.local`,
    `DTSTAMP:${cleanDate}T000000Z`,
    `DTSTART:${startStamp}`,
    `SUMMARY:CEKRutin: ${visit.serviceType} (${memberName})`,
    `LOCATION:${visit.facilityName}`,
    `DESCRIPTION:${visit.notes || 'Jadwal kunjungan fasilitas kesehatan CEKRutin.'}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], {type: 'text/calendar;charset=utf-8'});
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `agenda-faskes-${visit.date}.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
