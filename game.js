/**
 * DIVISI 7 (Seven-Layer Corps): Markas Investigasi Paket
 * 1:1 Storyboard-Matched Interactive Game Logic (5 Scenes + Consistent Top Nav & Agen FG Voice)
 */

const SCENE_SUBTITLES = {
  1: 'SCENE 1 — GERBANG REKRUTMEN KADET',
  2: 'SCENE 2 — LAB VISUALISASI X-RAY OSI LAYER',
  3: 'SCENE 3 — UJIAN KADET: PUZZLE RAKIT & BONGKAR PAKET',
  4: 'SCENE 4 — MEJA INVESTIGASI KASUS',
  5: 'SCENE 5 — UPACARA PELANTIKAN DETEKTIF'
};

const SCENARIO_LAYER_DETAILS = {
  chat: {
    7: {
      proto: 'XMPP/WS',
      pdu: 'Data',
      processTitle: 'Layer 7 (Application) — Bentuk Data (PDU): DATA',
      highlightPill: 'Bentuk Data (PDU): DATA (Pesan Aplikasi Asli)',
      box1Title: 'Isi Header Layer 7 (Application)',
      box1Val: 'Nama Aplikasi: Chat | Perintah: Kirim Pesan | Pengirim: Detektif',
      box2Title: 'Isi Data & Bentuk Data (PDU)',
      box2Val: 'Isi Pesan: "Halo Tim Divisi 7!" -> Bentuk Data: DATA',
      headerBlocks: ['Header L7: Info Aplikasi Chat', 'Data Pesan'],
      encapSpeech: 'Di Lapisan 7 (Application), bentuk data atau PDU adalah Data. Aplikasi Chat membuat pesan teks dan menambahkan Header Aplikasi berisi perintah kirim pesan.',
      encapAudio: 'assets/audio/s2_chat_encap_7.mp3',
      decapSpeech: 'Pada sisi Penerima di Lapisan 7, bentuk data adalah Data. Aplikasi Chat membaca Header Aplikasi lalu menampilkan isi pesan ke layar obrolan.',
      decapAudio: 'assets/audio/s2_chat_decap_7.mp3'
    },
    6: {
      proto: 'UTF-8/TLS',
      pdu: 'Data',
      processTitle: 'Layer 6 (Presentation) — Bentuk Data (PDU): DATA',
      highlightPill: 'Bentuk Data (PDU): DATA (Teks Terformat & Terenkripsi)',
      box1Title: 'Isi Header Layer 6 (Presentation)',
      box1Val: 'Format Karakter: UTF-8 | Tipe Kompresi: GZIP | Info Enkripsi: TLS',
      box2Title: 'Isi Data & Bentuk Data (PDU)',
      box2Val: 'Pesan Chat Terenkripsi -> Bentuk Data: DATA',
      headerBlocks: ['Header L6: Format UTF-8 & TLS', 'Header L7 + Data'],
      encapSpeech: 'Di Lapisan 6 (Presentation), bentuk data atau PDU tetap berupa Data. Isi Header Lapisan 6 memuat informasi format teks UTF-8 dan kunci enkripsi TLS.',
      encapAudio: 'assets/audio/s2_chat_encap_6.mp3',
      decapSpeech: 'Di sisi Penerima pada Lapisan 6, bentuk data adalah Data. Sistem membaca Header Presentation untuk mendekripsi dan menerjemahkan format UTF-8.',
      decapAudio: 'assets/audio/s2_chat_decap_6.mp3'
    },
    5: {
      proto: 'SES-CHAT',
      pdu: 'Data',
      processTitle: 'Layer 5 (Session) — Bentuk Data (PDU): DATA',
      highlightPill: 'Bentuk Data (PDU): DATA (Data Sesi Percakapan)',
      box1Title: 'Isi Header Layer 5 (Session)',
      box1Val: 'ID Sesi Obrolan: CHAT-701 | Status: Login Aktif (Keep-Alive)',
      box2Title: 'Isi Data & Bentuk Data (PDU)',
      box2Val: 'Data Pesan dalam Sesi Aktif -> Bentuk Data: DATA',
      headerBlocks: ['Header L5: ID Sesi CHAT-701', 'Data L6-L7'],
      encapSpeech: 'Di Lapisan 5 (Session), bentuk data atau PDU masih berupa Data. Isi Header Lapisan 5 menambahkan Nomor ID Sesi obrolan dan penanda koneksi aktif.',
      encapAudio: 'assets/audio/s2_chat_encap_5.mp3',
      decapSpeech: 'Lapisan 5 Penerima menerima bentuk data berupa Data dan membaca isi Header Session untuk memastikan ID Sesi obrolan cocok.',
      decapAudio: 'assets/audio/s2_chat_decap_5.mp3'
    },
    4: {
      proto: 'TCP',
      pdu: 'Segment',
      processTitle: 'Layer 4 (Transport) — Bentuk Data (PDU): SEGMENT',
      highlightPill: 'Bentuk Data (PDU): SEGMENT (Potongan Data + Header TCP)',
      box1Title: 'Isi Header Layer 4 (Transport TCP)',
      box1Val: 'Port Pengirim: 51240 | Port Tujuan: 5222 (Chat) | Nomor Urut (SEQ): 101',
      box2Title: 'Isi Data & Bentuk Data (PDU)',
      box2Val: 'Data Dipecah & Diberi Nomor Urut -> Bentuk Data: SEGMENT',
      headerBlocks: ['Header L4 TCP: Port Asal, Port Tujuan, No. Urut', 'Data'],
      encapSpeech: 'Di Lapisan 4 (Transport), pada kasus Chat TCP, bentuk data berubah menjadi Segment. Isi Header TCP memuat Port Pengirim, Port Tujuan 5222, dan Nomor Urut paket.',
      encapAudio: 'assets/audio/s2_chat_encap_4.mp3',
      decapSpeech: 'Lapisan 4 Penerima menerima bentuk data Segment, membaca isi Header TCP berupa nomor Port dan Nomor Urut, lalu menyatukannya kembali menjadi Data.',
      decapAudio: 'assets/audio/s2_chat_decap_4.mp3'
    },
    3: {
      proto: 'IPv4',
      pdu: 'Packet',
      processTitle: 'Layer 3 (Network) — Bentuk Data (PDU): PACKET',
      highlightPill: 'Bentuk Data (PDU): PACKET (Segment + Header Alamat IP)',
      box1Title: 'Isi Header Layer 3 (Network IP)',
      box1Val: 'IP Pengirim: 192.168.1.10 | IP Tujuan: 203.0.113.25 (Server Chat) | TTL: 64',
      box2Title: 'Isi Data & Bentuk Data (PDU)',
      box2Val: 'Segment TCP Dibungkus Alamat IP -> Bentuk Data: PACKET',
      headerBlocks: ['Header L3 IP: IP Pengirim & IP Tujuan', 'Segment'],
      encapSpeech: 'Di Lapisan 3 (Network), bentuk data berubah menjadi Packet. Isi Header Lapisan 3 menambahkan Alamat IP Pengirim dan Alamat IP Tujuan Server Chat.',
      encapAudio: 'assets/audio/s2_chat_encap_3.mp3',
      decapSpeech: 'Lapisan 3 Penerima menerima bentuk data Packet, memeriksa isi Header IP Tujuan, lalu melepasnya menjadi Segment untuk Lapisan 4.',
      decapAudio: 'assets/audio/s2_chat_decap_3.mp3'
    },
    2: {
      proto: 'ETH II',
      pdu: 'Frame',
      processTitle: 'Layer 2 (Data Link) — Bentuk Data (PDU): FRAME',
      highlightPill: 'Bentuk Data (PDU): FRAME (Packet + Header MAC & Trailer FCS)',
      box1Title: 'Isi Header & Trailer Layer 2 (Data Link)',
      box1Val: 'Header: MAC Pengirim (00:1A:2B..) & MAC Tujuan (AA:BB:CC..) | Trailer: FCS',
      box2Title: 'Isi Data & Bentuk Data (PDU)',
      box2Val: 'Packet IP Dibungkus Alamat Fisik MAC -> Bentuk Data: FRAME',
      headerBlocks: ['Header L2: MAC Asal & Tujuan', 'Packet', 'Trailer FCS'],
      encapSpeech: 'Di Lapisan 2 (Data Link), bentuk data berubah menjadi Frame. Isi Header Lapisan 2 memuat Alamat Fisik MAC Pengirim dan MAC Tujuan, serta penutup FCS di belakang.',
      encapAudio: 'assets/audio/s2_chat_encap_2.mp3',
      decapSpeech: 'Lapisan 2 Penerima menerima bentuk data Frame, memeriksa isi Header MAC Address dan segel FCS, lalu menyerahkan Packet ke Lapisan 3.',
      decapAudio: 'assets/audio/s2_chat_decap_2.mp3'
    },
    1: {
      proto: 'RJ45/UTP',
      pdu: 'Bits',
      processTitle: 'Layer 1 (Physical) — Bentuk Data (PDU): BITS (BINER)',
      highlightPill: 'Bentuk Data (PDU): BITS (Deretan Angka Biner 1 dan 0)',
      box1Title: 'Informasi Layer 1 (Physical)',
      box1Val: 'Tanpa Header Tambahan — Seluruh Frame Diubah ke Angka Biner 1 dan 0',
      box2Title: 'Isi Data & Bentuk Data (PDU)',
      box2Val: 'Deretan Bit: 10110010 01001000... -> Bentuk Data: BITS (BINER)',
      headerBlocks: ['Deretan Bit Biner Fisik: 1 0 1 1 0 0 1 0 0 1 0 0 1 0 0 0'],
      encapSpeech: 'Di Lapisan 1 (Physical), bentuk data berubah menjadi Bits atau angka biner 1 dan 0. Tanpa tambahan header, seluruh Frame dikirim sebagai sinyal listrik lewat kabel.',
      encapAudio: 'assets/audio/s2_chat_encap_1.mp3',
      decapSpeech: 'Lapisan 1 Penerima menerima bentuk data Bits biner dari kabel fisik, lalu merangkainya kembali menjadi Frame untuk dikirim naik ke Lapisan 2.',
      decapAudio: 'assets/audio/s2_chat_decap_1.mp3'
    }
  },
  udp: {
    7: {
      proto: 'RTP/VoIP',
      pdu: 'Data',
      processTitle: 'Layer 7 (Application) — Bentuk Data (PDU): DATA',
      highlightPill: 'Bentuk Data (PDU): DATA (Rekaman Gambar & Suara Live)',
      box1Title: 'Isi Header Layer 7 (Application Video Call)',
      box1Val: 'Aplikasi: Video Call (RTP) | Jenis Media: Kamera + Mikrofon | Timestamp',
      box2Title: 'Isi Data & Bentuk Data (PDU)',
      box2Val: 'Potongan Gambar & Suara Langsung -> Bentuk Data: DATA',
      headerBlocks: ['Header L7: Info Stream Video & Suara', 'Data Media'],
      encapSpeech: 'Di Lapisan 7 (Application), bentuk data atau PDU adalah Data. Aplikasi Video Call menangkap gambar kamera serta suara, lalu memberi Header Aplikasi penanda waktu.',
      encapAudio: 'assets/audio/s2_udp_encap_7.mp3',
      decapSpeech: 'Pada sisi Penerima di Lapisan 7, bentuk data adalah Data. Aplikasi Video Call membaca Header Aplikasi dan langsung menampilkan video serta suara ke layar.',
      decapAudio: 'assets/audio/s2_udp_decap_7.mp3'
    },
    6: {
      proto: 'H.264/Opus',
      pdu: 'Data',
      processTitle: 'Layer 6 (Presentation) — Bentuk Data (PDU): DATA',
      highlightPill: 'Bentuk Data (PDU): DATA (Media Terkompresi H.264/Opus)',
      box1Title: 'Isi Header Layer 6 (Presentation)',
      box1Val: 'Format Video: Codec H.264 | Format Suara: Opus | Enkripsi: SRTP',
      box2Title: 'Isi Data & Bentuk Data (PDU)',
      box2Val: 'Data Video & Suara Terkompresi Ringan -> Bentuk Data: DATA',
      headerBlocks: ['Header L6: Codec H.264/Opus & SRTP', 'Header L7 + Data'],
      encapSpeech: 'Di Lapisan 6 (Presentation), bentuk data tetap berupa Data. Isi Header Lapisan 6 mencatat format kompresi video H.264, audio Opus, dan enkripsi SRTP.',
      encapAudio: 'assets/audio/s2_udp_encap_6.mp3',
      decapSpeech: 'Di sisi Penerima pada Lapisan 6, bentuk data adalah Data. Sistem membaca Header Presentation untuk menerjemahkan codec H.264 dan Opus menjadi gambar dan suara.',
      decapAudio: 'assets/audio/s2_udp_decap_6.mp3'
    },
    5: {
      proto: 'SIP/WebRTC',
      pdu: 'Data',
      processTitle: 'Layer 5 (Session) — Bentuk Data (PDU): DATA',
      highlightPill: 'Bentuk Data (PDU): DATA (Sesi Panggilan Dua Arah)',
      box1Title: 'Isi Header Layer 5 (Session)',
      box1Val: 'ID Panggilan: CALL-UDP-882 | Mode: Dua Arah | Sinkronisasi Bibir & Suara',
      box2Title: 'Isi Data & Bentuk Data (PDU)',
      box2Val: 'Aliran Data Panggilan Sinkron -> Bentuk Data: DATA',
      headerBlocks: ['Header L5: ID Panggilan CALL-882', 'Data L6-L7'],
      encapSpeech: 'Di Lapisan 5 (Session), bentuk data masih berupa Data. Isi Header Lapisan 5 memuat ID Sesi Panggilan dan penanda sinkronisasi antara suara dengan gambar video.',
      encapAudio: 'assets/audio/s2_udp_encap_5.mp3',
      decapSpeech: 'Lapisan 5 Penerima menerima bentuk data berupa Data dan membaca isi Header Session agar suara serta gambar video diputar secara serempak.',
      decapAudio: 'assets/audio/s2_udp_decap_5.mp3'
    },
    4: {
      proto: 'UDP',
      pdu: 'Datagram',
      processTitle: 'Layer 4 (Transport) — Bentuk Data (PDU): DATAGRAM (UDP)',
      highlightPill: 'Bentuk Data (PDU): DATAGRAM / SEGMENT UDP (Tanpa Handshake)',
      box1Title: 'Isi Header Layer 4 (Transport UDP)',
      box1Val: 'Port Pengirim: 54110 | Port Tujuan: 5004 (Video UDP) | Panjang: 512 Byte (Tanpa ACK)',
      box2Title: 'Isi Data & Bentuk Data (PDU)',
      box2Val: 'Potongan Media Cepat Tanpa Nomor Urut -> Bentuk Data: DATAGRAM (UDP)',
      headerBlocks: ['Header L4 UDP: Port Asal & Tujuan (Ringkas)', 'Data Media'],
      encapSpeech: 'Di Lapisan 4 (Transport), pada kasus Video Call UDP, bentuk data berubah menjadi Datagram. Isi Header UDP sangat ringkas, hanya berisi Port Asal dan Port Tujuan 5004 tanpa menunggu ACK.',
      encapAudio: 'assets/audio/s2_udp_encap_4.mp3',
      decapSpeech: 'Lapisan 4 Penerima menerima bentuk data Datagram UDP, membaca nomor Port Tujuan 5004 pada Header UDP, dan langsung meneruskannya tanpa meminta kirim ulang.',
      decapAudio: 'assets/audio/s2_udp_decap_4.mp3'
    },
    3: {
      proto: 'IPv4 (QoS)',
      pdu: 'Packet',
      processTitle: 'Layer 3 (Network) — Bentuk Data (PDU): PACKET',
      highlightPill: 'Bentuk Data (PDU): PACKET (Datagram UDP + Header IP Prioritas)',
      box1Title: 'Isi Header Layer 3 (Network IP)',
      box1Val: 'IP Pengirim: 192.168.1.10 | IP Tujuan: 203.0.113.88 | Prioritas: QoS Real-Time',
      box2Title: 'Isi Data & Bentuk Data (PDU)',
      box2Val: 'Datagram UDP Dibungkus Alamat IP -> Bentuk Data: PACKET',
      headerBlocks: ['Header L3 IP: IP Asal, IP Tujuan & Prioritas QoS', 'Datagram UDP'],
      encapSpeech: 'Di Lapisan 3 (Network), bentuk data berubah menjadi Packet. Isi Header IP memuat Alamat IP Pengirim, IP Tujuan lawan bicara, dan label prioritas jalan cepat QoS.',
      encapAudio: 'assets/audio/s2_udp_encap_3.mp3',
      decapSpeech: 'Lapisan 3 Penerima menerima bentuk data Packet, memeriksa kesesuaian isi Header IP Tujuan, lalu melepasnya menjadi Datagram UDP.',
      decapAudio: 'assets/audio/s2_udp_decap_3.mp3'
    },
    2: {
      proto: 'ETH II',
      pdu: 'Frame',
      processTitle: 'Layer 2 (Data Link) — Bentuk Data (PDU): FRAME',
      highlightPill: 'Bentuk Data (PDU): FRAME (Packet + Header MAC & Trailer FCS)',
      box1Title: 'Isi Header & Trailer Layer 2 (Data Link)',
      box1Val: 'Header: MAC Pengirim (00:1A:2B..) & MAC Tujuan (AA:BB:CC..) | Trailer: FCS',
      box2Title: 'Isi Data & Bentuk Data (PDU)',
      box2Val: 'Packet Video Call Dibungkus MAC & FCS -> Bentuk Data: FRAME',
      headerBlocks: ['Header L2: MAC Asal & Tujuan', 'Packet', 'Trailer FCS'],
      encapSpeech: 'Di Lapisan 2 (Data Link), bentuk data berubah menjadi Frame. Isi Header Lapisan 2 menambahkan Alamat Fisik MAC Pengirim dan MAC Tujuan beserta segel FCS di belakang.',
      encapAudio: 'assets/audio/s2_udp_encap_2.mp3',
      decapSpeech: 'Lapisan 2 Penerima menerima bentuk data Frame, memeriksa isi Header MAC Address dan segel FCS, lalu menyerahkan Packet ke Lapisan 3.',
      decapAudio: 'assets/audio/s2_udp_decap_2.mp3'
    },
    1: {
      proto: 'RJ45/UTP',
      pdu: 'Bits',
      processTitle: 'Layer 1 (Physical) — Bentuk Data (PDU): BITS (BINER)',
      highlightPill: 'Bentuk Data (PDU): BITS (Deretan Angka Biner 1 dan 0)',
      box1Title: 'Informasi Layer 1 (Physical)',
      box1Val: 'Tanpa Header Tambahan — Seluruh Frame Diubah ke Aliran Bit Biner 1 dan 0',
      box2Title: 'Isi Data & Bentuk Data (PDU)',
      box2Val: 'Deretan Bit: 11010100 10101101... -> Bentuk Data: BITS (BINER)',
      headerBlocks: ['Aliran Bit Biner Fisik: 1 1 0 1 0 1 0 0 1 0 1 0 1 1 0 1'],
      encapSpeech: 'Di Lapisan 1 (Physical), bentuk data berubah menjadi Bits atau angka biner 1 dan 0 yang mengalir cepat melewati kabel jaringan menuju penerima.',
      encapAudio: 'assets/audio/s2_udp_encap_1.mp3',
      decapSpeech: 'Lapisan 1 Penerima menangkap bentuk data Bits biner dari kabel fisik dan menyusunnya kembali menjadi Frame untuk dikirim naik ke Lapisan 2.',
      decapAudio: 'assets/audio/s2_udp_decap_1.mp3'
    }
  }
};

const OSI_LAYERS_DATA = [
  {
    num: 7,
    name: 'Application',
    pdu: 'Data',
    proto: 'HTTP/1.1',
    headerLabel: 'Info Aplikasi & Perintah Kirim',
    processTitle: "HTTP Request ('GET /portal.html', '200 OK')",
    highlightPill: 'HTTP GET / HTTPS Request',
    box1Title: 'Client Application',
    box1Val: 'Host: smk-bisa.sch.id (UTF-8)',
    box2Title: 'Server Endpoint',
    box2Val: 'URI: /portal-ujian.html [200 OK]',
    diagramArrows: ['GET /portal.html', '200 OK + HTML', 'Render UI'],
    encapSpeech: 'Di Lapisan 7 (Application), aplikasi membentuk pesan Data asli dan menyematkan HTTP Request Header.',
    encapAudio: 'assets/audio/s2_encap_7.mp3',
    decapSpeech: 'Pada sisi Penerima di Lapisan 7, aplikasi membaca HTTP Header dan menampilkan halaman web ke layar.',
    decapAudio: 'assets/audio/s2_decap_7.mp3'
  },
  {
    num: 6,
    name: 'Presentation',
    pdu: 'Data',
    proto: 'TLS 1.3',
    headerLabel: 'Format Karakter UTF-8/Codec & Enkripsi',
    processTitle: 'Translasi UTF-8, Kompresi GZIP & Enkripsi TLS',
    highlightPill: 'Cipher: AES-256-GCM (TLS 1.3)',
    box1Title: 'Plaintext Input',
    box1Val: 'Encoding: UTF-8 | Compress: GZIP',
    box2Title: 'Ciphertext Output',
    box2Val: 'Payload: 0x9F8A...c41E (Encrypted)',
    diagramArrows: ['Encode UTF-8', 'GZIP Compress', 'TLS AES Encrypt'],
    encapSpeech: 'Di Lapisan 6 (Presentation), karakter diterjemahkan ke UTF-8, dikompresi, dan dienkripsi menjadi Ciphertext TLS.',
    encapAudio: 'assets/audio/s2_encap_6.mp3',
    decapSpeech: 'Di sisi Penerima, Lapisan 6 mendekripsi Ciphertext kembali menjadi data asli agar dapat dibaca oleh Lapisan 7.',
    decapAudio: 'assets/audio/s2_decap_6.mp3'
  },
  {
    num: 5,
    name: 'Session',
    pdu: 'Data',
    proto: 'RPC/SES',
    headerLabel: 'ID Sesi & Status Koneksi (Keep-Alive)',
    processTitle: "Manajemen Sesi ('OPEN', 'KEEP-ALIVE', 'SYNC')",
    highlightPill: 'Session ID: SES-D7-9082A',
    box1Title: 'Dialog Control',
    box1Val: 'Mode: Full-Duplex Session',
    box2Title: 'Sync Checkpoint',
    box2Val: 'Checkpoint: CHK-01 (Verified)',
    diagramArrows: ['Session Auth', 'Keep-Alive', 'Sync Point CHK'],
    encapSpeech: 'Di Lapisan 5 (Session), sistem membuka sesi komunikasi antara pengirim dan penerima serta menempelkan Session ID.',
    encapAudio: 'assets/audio/s2_encap_5.mp3',
    decapSpeech: 'Lapisan 5 Penerima memverifikasi Session ID dan memastikan titik sinkronisasi sesi sudah sesuai.',
    decapAudio: 'assets/audio/s2_decap_5.mp3'
  },
  {
    num: 4,
    name: 'Transport',
    pdu: 'Segment',
    proto: 'TCP',
    headerLabel: 'Nomor Port Pengirim & Port Tujuan (TCP/UDP)',
    processTitle: "TCP 3-Way Handshake ('SYN', 'SYN-ACK', 'ACK')",
    highlightPill: 'Port 443 HTTPS (SrcPort: 51423)',
    box1Title: 'Source',
    box1Val: 'Port: 51423 | SEQ = 101',
    box2Title: 'Destination',
    box2Val: 'Port: 443 HTTPS | ACK = 1',
    diagramArrows: ["'SYN'", "'SYN-ACK'", "'ACK'"],
    encapSpeech: 'Di Lapisan 4 (Transport), data dipecah menjadi Segment, diberi nomor Port, dan melakukan TCP Handshake.',
    encapAudio: 'assets/audio/s2_encap_4.mp3',
    decapSpeech: 'Lapisan 4 Penerima memeriksa nomor Port tujuan dan menyusun ulang urutan Segment secara lengkap.',
    decapAudio: 'assets/audio/s2_decap_4.mp3'
  },
  {
    num: 3,
    name: 'Network',
    pdu: 'Packet',
    proto: 'IPv4',
    headerLabel: 'Alamat IP Pengirim & Alamat IP Tujuan',
    processTitle: "IPv4 Addressing & Routing ('SrcIP -> Gateway -> DstIP')",
    highlightPill: 'Default Gateway: 192.168.1.1 (TTL=64)',
    box1Title: 'Source',
    box1Val: 'IP Address: 192.168.1.10 /24',
    box2Title: 'Destination',
    box2Val: 'IP Address: 203.0.113.50',
    diagramArrows: ['Lookup Subnet', 'Route Gateway', 'Forward Packet'],
    encapSpeech: 'Di Lapisan 3 (Network), Segment dibungkus menjadi Packet dengan alamat IP pengirim dan IP tujuan serta menentukan rute.',
    encapAudio: 'assets/audio/s2_encap_3.mp3',
    decapSpeech: 'Lapisan 3 Penerima memeriksa kesesuaian alamat IP tujuan, lalu melepas pembungkus IP Header.',
    decapAudio: 'assets/audio/s2_decap_3.mp3'
  },
  {
    num: 2,
    name: 'Data Link',
    pdu: 'Frame',
    proto: 'ETH II',
    headerLabel: 'Alamat Fisik MAC Address & Segel FCS',
    processTitle: "Ethernet Framing & ARP ('SrcMAC -> DstMAC + FCS')",
    highlightPill: 'Trailer Checksum: FCS/CRC-32 [VALID]',
    box1Title: 'Source MAC (NIC)',
    box1Val: 'MAC: 00:1A:2B:3C:4D:5E',
    box2Title: 'Destination MAC (Router)',
    box2Val: 'MAC: AA:BB:CC:00:01:01',
    diagramArrows: ['ARP Request', 'ARP Reply MAC', 'Append FCS CRC'],
    encapSpeech: 'Di Lapisan 2 (Data Link), Packet dibungkus menjadi Frame dengan alamat fisik MAC Address di depan dan segel FCS di belakang.',
    encapAudio: 'assets/audio/s2_encap_2.mp3',
    decapSpeech: 'Lapisan 2 Penerima memvalidasi MAC Address dan menghitung nilai FCS untuk memastikan Frame bebas kerusakan.',
    decapAudio: 'assets/audio/s2_decap_2.mp3'
  },
  {
    num: 1,
    name: 'Physical',
    pdu: 'Bits',
    proto: 'RJ45/UTP',
    headerLabel: 'Tanpa Header: Deretan Bit Biner 1 dan 0',
    processTitle: "Transmisi Biner & Sinyal Fisik ('01001000 -> +5V/-5V')",
    highlightPill: 'Link UP: 1000 Mbps Full-Duplex (UTP Cat6)',
    box1Title: 'Bit Stream Serialization',
    box1Val: 'Bits: 10101011 01001000 ...',
    box2Title: 'Physical Media',
    box2Val: 'Konektor RJ45 T568B -> Switch Port #1',
    diagramArrows: ['Frame to Bits', 'Line Coding +5V', 'Cable Transmit'],
    encapSpeech: 'Di Lapisan 1 (Physical), seluruh Frame diubah menjadi deretan biner bit 1 dan 0 berupa sinyal listrik lewat kabel jaringan.',
    encapAudio: 'assets/audio/s2_encap_1.mp3',
    decapSpeech: 'Lapisan 1 Penerima menangkap sinyal listrik dari kabel jaringan, mengubahnya menjadi bit biner, lalu meneruskannya ke Lapisan 2.',
    decapAudio: 'assets/audio/s2_decap_1.mp3'
  }
];

const INVESTIGATION_CASES = [
  {
    id: 'K-01',
    level: 'Mudah',
    title: 'KASUS K-01: MISTERI KOMPUTER BISU',
    culpritLayer: 1,
    victimReport: 'Komputer Lab SMK #04 (IP: 192.168.1.14) gagal mengirim pesan chat ke Server (IP: 192.168.1.25). Lampu indikator LED pada port konektor jaringan (RJ45) tampak padam.',
    fgBriefingSeq: [
      {
        text: 'Kasus K-01 dimulai! Komputer laboratorium lumpuh total dan lampu indikator port kabel jaringan mati.',
        audioFile: 'assets/audio/s4_k01_1.mp3'
      },
      {
        text: 'Klik tiap lapisan pada pemindai diagnostik di tengah untuk mencari sumber kerusakan. Hati-hati, salah menandai lapisan akan mengurangi 10 poin.',
        audioFile: 'assets/audio/s4_k01_2.mp3'
      },
      {
        text: 'Jika menemui kesulitan kamu dapat menghubungiku melalui radio komunikasi. Tapi tentu itu tidak gratis.',
        audioFile: 'assets/audio/s4_radio_info.mp3'
      }
    ],
    fgHint: 'Petunjuk Agen FG: Perhatikan laporan korban, lampu port jaringan mati total dan bit bernilai 00000000. Periksa Lapisan 1 Physical paling bawah.',
    fgHintAudio: 'assets/audio/s4_k01_hint.mp3',
    fgSuccess: 'Sempurna! Konektor kabel jaringan di Lapisan 1 Physical berhasil dipasang ke port aktif dan aliran bit kembali normal.',
    fgSuccessAudio: 'assets/audio/s4_k01_ok.mp3',
    repairOptions: [
      {
        val: 'err1',
        text: 'Mengganti nomor Port TCP Tujuan dari 5222 menjadi 8080 pada konfigurasi aplikasi'
      },
      {
        val: 'ok',
        text: 'Memasang kembali konektor kabel UTP RJ45 (T568B) ke port Switch aktif hingga sinyal biner mengalir'
      },
      {
        val: 'err2',
        text: 'Mengubah format encoding karakter pesan dari UTF-8 menjadi ASCII pada Layer 6'
      },
      {
        val: 'err3',
        text: 'Mengganti alamat IP komputer menjadi 10.0.0.14 tanpa memeriksa sambungan fisik kabel'
      }
    ],
    layersStatus: {
      7: {
        label: 'Application',
        msg: 'PDU: Data | Isi Header: Aplikasi Chat, Perintah = KIRIM_PESAN ("Halo Tim Divisi 7")'
      },
      6: {
        label: 'Presentation',
        msg: 'PDU: Data | Isi Header: Format Karakter = UTF-8, Kompresi = GZIP, Enkripsi = TLS 1.3'
      },
      5: {
        label: 'Session',
        msg: 'PDU: Data | Isi Header: ID Sesi = CHAT-701, Status Sesi = Keep-Alive'
      },
      4: {
        label: 'Transport',
        msg: 'PDU: Segment | Isi Header: Protokol = TCP, Port Pengirim = 51240, Port Tujuan = 5222, SEQ = 101'
      },
      3: {
        label: 'Network',
        msg: 'PDU: Packet | Isi Header: IP Pengirim = 192.168.1.14/24, IP Tujuan = 192.168.1.25/24, Gateway = 192.168.1.1'
      },
      2: {
        label: 'Data Link',
        msg: 'PDU: Frame | Isi Header: MAC Pengirim = 00:1A:2B:3C:4D:5E, MAC Tujuan = AA:BB:CC:00:01:02, Trailer = FCS'
      },
      1: {
        label: 'Physical',
        msg: 'PDU: Bits | Transmisi Fisik: Deretan Bit = 00000000 00000000 (Tegangan Kabel = 0V, Konektor RJ45 = Terlepas)'
      }
    }
  },
  {
    id: 'K-02',
    level: 'Sedang',
    title: 'KASUS K-02: PAKET TERSESAT DI PERSIMPANGAN',
    culpritLayer: 3,
    victimReport: 'Komputer Detektif (IP: 192.168.10.15/24, IP Router Ruangan: 192.168.10.1) berhasil terhubung ke komputer satu ruangan, tetapi gagal menghubungi Server Pusat di luar jaringan (IP: 203.0.113.88).',
    fgBriefingSeq: [
      {
        text: 'Kasus K-02 tingkat sedang dimulai! Komputer berhasil terhubung di dalam ruangan lokal, tetapi gagal keluar menuju Server Pusat.',
        audioFile: 'assets/audio/s4_k02_1.mp3'
      },
      {
        text: 'Kabel jaringan menyala normal namun paket tersesat di persimpangan. Pindai ketujuh lapisan di tengah untuk menemukan penyebabnya.',
        audioFile: 'assets/audio/s4_k02_2.mp3'
      },
      {
        text: 'Jika menemui kesulitan kamu dapat menghubungiku melalui radio komunikasi. Tapi tentu itu tidak gratis.',
        audioFile: 'assets/audio/s4_radio_info.mp3'
      }
    ],
    fgHint: 'Petunjuk Agen FG: Jaringan lokal lancar berarti Lapisan 1 dan 2 aman. Periksa Lapisan 3 Network tempat alamat IP Default Gateway diatur.',
    fgHintAudio: 'assets/audio/s4_k02_hint.mp3',
    fgSuccess: 'Analisis yang tajam! Mengubah Default Gateway ke subnet yang benar di Lapisan 3 berhasil memulihkan rute paket.',
    fgSuccessAudio: 'assets/audio/s4_k02_ok.mp3',
    repairOptions: [
      {
        val: 'err1',
        text: 'Mengganti kabel UTP Cat6 meskipun aliran bit pada Layer 1 sudah berjalan 1000 Mbps'
      },
      {
        val: 'err2',
        text: 'Mengubah codec kompresi video dari H.264 menjadi MPEG-2 pada aplikasi Video Call'
      },
      {
        val: 'ok',
        text: 'Mengubah alamat IP Default Gateway menjadi 192.168.10.1 agar satu subnet (/24) dengan IP pengirim'
      },
      {
        val: 'err3',
        text: 'Mengganti nomor Port UDP dari 5004 menjadi Port 21 pada Header Transport'
      }
    ],
    layersStatus: {
      7: {
        label: 'Application',
        msg: 'PDU: Data | Isi Header: Aplikasi Video Call (RTP), Stream Kamera & Mikrofon Siap'
      },
      6: {
        label: 'Presentation',
        msg: 'PDU: Data | Isi Header: Codec Video = H.264, Codec Suara = Opus, Enkripsi = SRTP'
      },
      5: {
        label: 'Session',
        msg: 'PDU: Data | Isi Header: ID Panggilan = CALL-UDP-882, Mode = Full-Duplex'
      },
      4: {
        label: 'Transport',
        msg: 'PDU: Datagram | Isi Header: Protokol = UDP, Port Pengirim = 54110, Port Tujuan = 5004, Panjang = 512B'
      },
      3: {
        label: 'Network',
        msg: 'PDU: Packet | Isi Header: IP Pengirim = 192.168.10.15/24, IP Tujuan = 203.0.113.88, Default Gateway = 192.168.99.1'
      },
      2: {
        label: 'Data Link',
        msg: 'PDU: Frame | Isi Header: MAC Pengirim = 00:1A:2B:3C:4D:5E, MAC Tujuan = AA:BB:CC:00:01:01, Trailer FCS = Valid'
      },
      1: {
        label: 'Physical',
        msg: 'PDU: Bits | Transmisi Fisik: Deretan Bit = 11010100 10101101 (Kabel RJ45 Terhubung 1000 Mbps)'
      }
    }
  },
  {
    id: 'K-03',
    level: 'Susah (Cyber)',
    title: 'KASUS K-03: PENYADAP BAYANGAN (ARP SPOOFING)',
    culpritLayer: 2,
    victimReport: 'INSIDEN SIBER! Paket dari Komputer Lab (IP: 192.168.1.10) menuju Router Utama (IP: 192.168.1.1, MAC Asli Router: AA:BB:CC:00:01:01) berbelok ke laptop penyusup yang memiliki alamat fisik MAC DE:AD:BE:EF:66:66.',
    fgBriefingSeq: [
      {
        text: 'Kasus K-03 tingkat susah keamanan siber dimulai! Lalu lintas data di laboratorium dibelokkan secara diam-diam ke komputer peretas.',
        audioFile: 'assets/audio/s4_k03_1.mp3'
      },
      {
        text: 'Alamat IP tujuan tampak benar, tetapi paket berbelok sebelum mencapai router. Pindai dan temukan lapisan yang dimanipulasi peretas.',
        audioFile: 'assets/audio/s4_k03_2.mp3'
      },
      {
        text: 'Jika menemui kesulitan kamu dapat menghubungiku melalui radio komunikasi. Tapi tentu itu tidak gratis.',
        audioFile: 'assets/audio/s4_radio_info.mp3'
      }
    ],
    fgHint: 'Petunjuk Agen FG: Peretas melakukan serangan ARP Spoofing dengan memalsukan alamat fisik MAC Address di dalam Frame. Pindai Lapisan 2 Data Link.',
    fgHintAudio: 'assets/audio/s4_k03_hint.mp3',
    fgSuccess: 'Luar biasa! Serangan penyadapan di Lapisan 2 berhasil ditangkis dengan mengisolasi alamat MAC palsu milik peretas.',
    fgSuccessAudio: 'assets/audio/s4_k03_ok.mp3',
    repairOptions: [
      {
        val: 'err1',
        text: 'Mengganti alamat IP Tujuan Router dari 192.168.1.1 menjadi 192.168.2.1 pada Layer 3'
      },
      {
        val: 'err2',
        text: 'Menonaktifkan enkripsi TLS pada Layer 6 agar pengiriman pesan berlangsung tanpa sandi'
      },
      {
        val: 'err3',
        text: 'Mengubah Session ID obrolan pada Layer 5 tanpa memeriksa alamat fisik perangkat tujuan'
      },
      {
        val: 'ok',
        text: 'Membersihkan tabel ARP cache dan mengunci (Static ARP) MAC Tujuan ke MAC Router asli (AA:BB:CC:00:01:01)'
      }
    ],
    layersStatus: {
      7: {
        label: 'Application',
        msg: 'PDU: Data | Isi Header: Aplikasi Chat Divisi 7, Perintah = KIRIM_DOKUMEN_RAHASIA'
      },
      6: {
        label: 'Presentation',
        msg: 'PDU: Data | Isi Header: Format Karakter = UTF-8, Kompresi = GZIP, Enkripsi = TLS 1.3'
      },
      5: {
        label: 'Session',
        msg: 'PDU: Data | Isi Header: ID Sesi = CHAT-701, Status = Terhubung (Keep-Alive)'
      },
      4: {
        label: 'Transport',
        msg: 'PDU: Segment | Isi Header: Protokol = TCP, Port Pengirim = 51240, Port Tujuan = 5222, SEQ = 101'
      },
      3: {
        label: 'Network',
        msg: 'PDU: Packet | Isi Header: IP Pengirim = 192.168.1.10/24, IP Tujuan = 192.168.1.1 (IP Router Utama)'
      },
      2: {
        label: 'Data Link',
        msg: 'PDU: Frame | Isi Header: MAC Pengirim = 00:1A:2B:3C:4D:5E, MAC Tujuan = DE:AD:BE:EF:66:66, Trailer FCS = Valid'
      },
      1: {
        label: 'Physical',
        msg: 'PDU: Bits | Transmisi Fisik: Deretan Bit = 10110010 01001000 (Sinyal Kabel RJ45 Stabil 1000 Mbps)'
      }
    }
  }
];

const SCENE1_SPEECH_SEQUENCE = [
  {
    text: 'Selamat datang di Divisi 7, markas agen rahasia kasus di jaringan komputer.',
    audioFile: 'assets/audio/s1_1.mp3'
  },
  {
    text: 'Kamu akan memulai perjalanan menjadi Detektif Legendaris. Untuk menjadi Detektif Legendaris kamu harus mampu menyelesaikan semua kasus.',
    audioFile: 'assets/audio/s1_2.mp3'
  },
  {
    text: 'Tapi tenang, sebelum menghadapi kasus, kamu akan mengikuti pelatihan dan ujian kenaikan tingkat.',
    audioFile: 'assets/audio/s1_3.mp3'
  },
  {
    text: 'Mari mulai dengan mengisikan nama dan memilih kode agen rahasia mu. Dalam setiap rintangan, saya siap membantumu',
    audioFile: 'assets/audio/s1_4.mp3'
  }
];

const SCENE2_SPEECH_SEQUENCE = [
  {
    text: 'Selamat datang di Laboratorium Visualisasi Paket Divisi 7.',
    audioFile: 'assets/audio/s2_1.mp3'
  },
  {
    text: 'Klik Lapisan 7 sampai Lapisan 1 di sebelah kiri untuk mempelajari proses Enkapsulasi dan Dekapsulasi paket data.',
    audioFile: 'assets/audio/s2_2.mp3'
  }
];

const SCENE3_SPEECH_SEQUENCE = [
  {
    text: 'Sekarang saatnya mengikuti Ujian Kenaikan Tingkat Detektif.',
    audioFile: 'assets/audio/s3_1.mp3'
  },
  {
    text: 'Pasangkan setiap lapisan OSI dengan unit data dan informasi header yang tepat pada papan sirkuit di tengah. Raih skor minimal 80 persen untuk lulus.',
    audioFile: 'assets/audio/s3_2.mp3'
  }
];

const SCENE5_GRAD_SEQUENCE = [
  {
    text: 'Selamat, Detektif Legendaris Divisi 7! Kamu telah menuntaskan pelatihan, ujian, dan investigasi kasus dengan gemilang.',
    audioFile: 'assets/audio/s5_grad_1.mp3'
  },
  {
    text: 'Silakan klik tombol Cetak Sertifikat untuk menyimpan bukti kelulusanmu. Saya bangga mendampingimu.',
    audioFile: 'assets/audio/s5_grad_2.mp3'
  }
];

const SCENE5_UNGRAD_SEQUENCE = [
  {
    text: 'Kamu saat ini belum menuntaskan seluruh syarat kelulusan ujian dan investigasi kasus.',
    audioFile: 'assets/audio/s5_ungrad_1.mp3'
  },
  {
    text: 'Selesaikan ujian dan investigasi kasus terlebih dahulu untuk meraih gelar Detektif Legendaris Divisi 7.',
    audioFile: 'assets/audio/s5_ungrad_2.mp3'
  }
];

class Divisi7Game {
  constructor() {
    this.state = {
      currentScene: 1,
      studentName: '',
      studentClass: 'X TKJ 1',
      callsign: 'K7X9',
      rank: 'Kadet',
      // Scene 2
      labScenario: 'chat',
      labMode: 'encap',
      activeLabLayer: 7,
      visitedLayers: [7],
      // Scene 3
      examPassed: false,
      examScore: 0,
      // Scene 4
      activeCaseIndex: 0,
      caseScore: 100,
      hintUsed: false,
      selectedScanLayer: 7,
      culpritFound: false,
      caseSolved: false,
      solvedCaseIds: []
    };
    this.teacherUnlocked = false;
    this.typewriterTimer = null;
    this.sequenceTimer = null;
    this.initialDelayTimer = null;
    this.sequenceRunId = 0;
    this.firstInteractionDone = false;
    this.loadSavedState();
  }

  init() {
    this.setupDialogLightDismissFallback();
    this.updateCallsignTiles(this.state.callsign);
    this.bindEvents();
    this.renderScene2Stacks();
    this.renderScene3Motherboard();
    this.renderScene4Investigation();
    this.goToScene(this.state.currentScene, false);
  }

  setupDialogLightDismissFallback() {
    const dialogs = document.querySelectorAll('dialog');
    if (!('closedBy' in HTMLDialogElement.prototype)) {
      dialogs.forEach((dialog) => {
        dialog.addEventListener('click', (event) => {
          if (event.target !== dialog) return;
          const rect = dialog.getBoundingClientRect();
          const inside =
            rect.top <= event.clientY &&
            event.clientY <= rect.top + rect.height &&
            rect.left <= event.clientX &&
            event.clientX <= rect.left + rect.width;
          if (!inside) dialog.close();
        });
      });
    }
  }

  saveState() {
    try {
      localStorage.setItem('divisi7_sb_v3', JSON.stringify(this.state));
    } catch (e) {}
  }

  loadSavedState() {
    try {
      const raw = localStorage.getItem('divisi7_sb_v3');
      if (raw) {
        const parsed = JSON.parse(raw);
        this.state = {
          ...this.state,
          studentName: parsed.studentName || '',
          callsign: parsed.callsign || this.state.callsign,
          currentScene: 1,
          examPassed: false,
          examScore: 0,
          caseScore: 100,
          hintUsed: false,
          selectedScanLayer: 7,
          culpritFound: false,
          caseSolved: false,
          solvedCaseIds: []
        };
      }
    } catch (e) {}
  }

  resetAll() {
    window.sfx.playClick();
    localStorage.removeItem('divisi7_sb_v3');
    this.state = {
      currentScene: 1,
      studentName: '',
      studentClass: 'X TKJ 1',
      callsign: this.createRandomCallsign(),
      rank: 'Kadet',
      labScenario: 'chat',
      labMode: 'encap',
      activeLabLayer: 7,
      visitedLayers: [7],
      examPassed: false,
      examScore: 0,
      activeCaseIndex: 0,
      caseScore: 100,
      hintUsed: false,
      selectedScanLayer: 7,
      culpritFound: false,
      caseSolved: false,
      solvedCaseIds: []
    };
    const nameIn = document.getElementById('inputStudentName');
    if (nameIn) nameIn.value = '';
    this.updateCallsignTiles(this.state.callsign);
    this.renderScene3Motherboard();
    this.renderScene4Investigation();
    this.goToScene(1);
  }

  createRandomCallsign() {
    const letters = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
    const digits = '23456789';
    return (
      letters[Math.floor(Math.random() * letters.length)] +
      digits[Math.floor(Math.random() * digits.length)] +
      letters[Math.floor(Math.random() * letters.length)] +
      digits[Math.floor(Math.random() * digits.length)]
    );
  }

  updateCallsignTiles(code) {
    const clean = (code || 'K7X9').padEnd(4, 'X');
    for (let i = 0; i < 4; i++) {
      const tile = document.getElementById(`codeTile${i}`);
      if (tile) tile.textContent = clean[i];
    }
  }

  spinCallsign() {
    window.sfx.playCipherSpin();
    let count = 0;
    const timer = setInterval(() => {
      const c = this.createRandomCallsign();
      this.updateCallsignTiles(c);
      count++;
      if (count >= 7) {
        clearInterval(timer);
        this.state.callsign = c;
        this.saveState();
        this.updateTopHUD();
      }
    }, 45);
  }

  clearSpeechTimers() {
    this.sequenceRunId++;
    if (this.typewriterTimer) {
      clearInterval(this.typewriterTimer);
      this.typewriterTimer = null;
    }
    if (this.sequenceTimer) {
      clearTimeout(this.sequenceTimer);
      this.sequenceTimer = null;
    }
    if (this.initialDelayTimer) {
      clearTimeout(this.initialDelayTimer);
      this.initialDelayTimer = null;
    }
  }

  typewriteText(msg) {
    const el = document.getElementById('mentorSpeechText');
    if (!el) return;
    if (this.typewriterTimer) clearInterval(this.typewriterTimer);
    el.textContent = '';
    let i = 0;
    this.typewriterTimer = setInterval(() => {
      el.textContent += msg.charAt(i);
      if (i % 4 === 0) window.sfx.playTypewriter();
      i++;
      if (i >= msg.length) clearInterval(this.typewriterTimer);
    }, 13);
  }

  speakFG(template, options = {}) {
    const code = this.state.callsign || 'K7X9';
    const name = this.state.studentName || 'Kadet';
    const msg = template
      .replace(/\[KODE\]/g, code)
      .replace(/\[NAMA\]/g, name)
      .replace(/\[KELAS\]/g, this.state.studentClass || 'X TKJ');

    const seq = [
      {
        text: msg,
        audioFile: options.audioFile || null
      }
    ];
    this.speakSequence(seq, 0);
  }

  speakSequence(messages, initialDelayMs = 0) {
    this.clearSpeechTimers();
    window.sfx.stopCurrentVoice();
    const el = document.getElementById('mentorSpeechText');
    if (!el || !messages || !messages.length) return;

    this.currentSequence = messages;
    const runId = this.sequenceRunId;
    const firstItem = typeof messages[0] === 'string' ? { text: messages[0] } : messages[0];
    el.textContent = firstItem.text;

    const playStep = (idx) => {
      if (this.sequenceRunId !== runId || idx >= messages.length) return;
      const item = typeof messages[idx] === 'string' ? { text: messages[idx] } : messages[idx];
      this.typewriteText(item.text);
      window.sfx.speakVoice(item.text, {
        tone: 'welcoming',
        audioFile: item.audioFile || null,
        onEnd: () => {
          if (this.sequenceRunId !== runId) return;
          if (idx + 1 < messages.length) {
            // Jeda sejenak lalu ganti ke teks berikutnya
            this.sequenceTimer = setTimeout(() => {
              playStep(idx + 1);
            }, 750);
          }
        }
      });
    };

    if (initialDelayMs > 0) {
      this.initialDelayTimer = setTimeout(() => {
        this.initialDelayTimer = null;
        playStep(0);
      }, initialDelayMs);
    } else {
      playStep(0);
    }
  }

  replayFgSpeech() {
    window.sfx.init();
    this.applySceneAudioMood(this.state.currentScene);
    window.sfx.playClick();
    if (this.currentSequence && this.currentSequence.length) {
      this.speakSequence(this.currentSequence, 0);
    } else if (this.state.currentScene === 1) {
      this.speakSequence(SCENE1_SPEECH_SEQUENCE, 0);
    } else {
      window.sfx.repeatLastVoice();
    }
  }

  allCasesSolved() {
    return (
      Array.isArray(this.state.solvedCaseIds) &&
      INVESTIGATION_CASES.every((item) => this.state.solvedCaseIds.includes(item.id))
    );
  }

  isSceneUnlocked(sc) {
    if (this.teacherUnlocked) return true;
    if (sc === 1) return true;
    if (sc === 2 || sc === 3) return Boolean(this.state.studentName);
    if (sc === 4) return Boolean(this.state.examPassed);
    if (sc === 5) return this.allCasesSolved();
    return false;
  }

  isGraduated() {
    return Boolean(this.state.examPassed && this.allCasesSolved());
  }

  applySceneAudioMood(sceneNum) {
    if (sceneNum === 1 || sceneNum === 2) {
      // Scene 1 dan 2 : Nuansa Santai
      window.sfx.setMood('relaxed');
    } else if (sceneNum === 3 || sceneNum === 4) {
      // Scene 3 dan 4 : Nuansa Menegangkan
      window.sfx.setMood('tense');
    } else if (sceneNum === 5) {
      // Scene 5 : Nuansa Kemenangan jika lulus, Nuansa Santai jika tidak lulus
      if (this.isGraduated()) {
        window.sfx.setMood('victory');
      } else {
        window.sfx.setMood('relaxed');
      }
    }
  }

  updateConsistentFgAppearance(sceneNum) {
    // Agen FG selalu berada di posisi kiri bawah yang SAMA, hanya ekspresi/pose yang menyesuaikan
    const fgImg = document.getElementById('consistentFgImg');
    if (!fgImg) return;
    if (sceneNum === 3) {
      fgImg.src = 'assets/sprites/fg_thumb.png';
    } else if (sceneNum === 5 && this.isGraduated()) {
      fgImg.src = 'assets/sprites/fg_salute.png';
    } else {
      fgImg.src = 'assets/sprites/fg_stand.png';
    }
  }

  updateTopHUD() {
    const sc = this.state.currentScene;
    const code = this.state.callsign || 'K7X9';

    const rankEl = document.getElementById('hudAgentRank');
    const scoreEl = document.getElementById('hudScoreVal');
    const levelEl = document.getElementById('hudLevelVal');

    if (rankEl) rankEl.textContent = `"${code}"`;
    if (scoreEl) scoreEl.textContent = `${this.state.caseScore} Poin`;
    if (levelEl) {
      const currentCase = INVESTIGATION_CASES[this.state.activeCaseIndex];
      levelEl.textContent = currentCase ? currentCase.level : 'Mudah';
    }

    // Update consistent top navigation buttons
    document.querySelectorAll('.nav-scene-btn[data-scene]').forEach((btn) => {
      const n = parseInt(btn.dataset.scene, 10);
      const unlocked = this.isSceneUnlocked(n);
      btn.disabled = !unlocked;
      btn.setAttribute('aria-disabled', String(!unlocked));
      btn.classList.toggle('active', n === sc && unlocked);
      btn.classList.toggle('completed', n < sc && unlocked);
    });

    const btnPrev = document.getElementById('btnTopPrevScene');
    const btnNext = document.getElementById('btnTopNextScene');
    if (btnPrev) btnPrev.disabled = sc <= 1;
    if (btnNext) btnNext.disabled = sc >= 5 || !this.isSceneUnlocked(sc + 1);
  }

  goToScene(sceneNum, playSound = true) {
    if (playSound) window.sfx.playClick();
    this.state.currentScene = sceneNum;
    document.body.dataset.activeScene = String(sceneNum);
    this.saveState();

    document.querySelectorAll('.scene-stage').forEach((sec) => {
      sec.classList.toggle('active', parseInt(sec.dataset.sceneView, 10) === sceneNum);
    });

    if (window.bg3d) {
      window.bg3d.activeScene = sceneNum;
      window.bg3d.mode =
        sceneNum === 5 && this.isGraduated()
          ? 'gold'
          : sceneNum === 3 || sceneNum === 4
          ? 'alert'
          : 'normal';
    }

    this.updateConsistentFgAppearance(sceneNum);
    this.applySceneAudioMood(sceneNum);
    this.updateTopHUD();

    if (sceneNum === 1) {
      const nameIn = document.getElementById('inputStudentName');
      if (nameIn && this.state.studentName) nameIn.value = this.state.studentName;
      this.speakSequence(SCENE1_SPEECH_SEQUENCE, 0);
    } else if (sceneNum === 2) {
      if (this.state.labScenario === 'web') this.state.labScenario = 'udp';
      const selScenario = document.getElementById('selectLabScenario');
      if (selScenario) selScenario.value = this.state.labScenario || 'chat';
      this.selectLabLayer(this.state.activeLabLayer || 7, false);
      this.speakSequence(SCENE2_SPEECH_SEQUENCE, 0);
    } else if (sceneNum === 3) {
      const btnToS4 = document.getElementById('btnExamToInvestigation');
      if (btnToS4) {
        btnToS4.style.display = this.state.examPassed ? 'inline-flex' : 'none';
      }
      this.speakSequence(SCENE3_SPEECH_SEQUENCE, 0);
    } else if (sceneNum === 4) {
      this.renderScene4Investigation();
      const c = INVESTIGATION_CASES[this.state.activeCaseIndex];
      this.speakSequence(c.fgBriefingSeq, 0);
    } else if (sceneNum === 5) {
      this.renderCertificate();
      if (this.isGraduated()) {
        window.sfx.playFanfare();
        this.speakSequence(SCENE5_GRAD_SEQUENCE, 0);
      } else {
        this.speakSequence(SCENE5_UNGRAD_SEQUENCE, 0);
      }
    }
  }

  bindEvents() {
    // Auto-unlock audio latar pada interaksi pertama jika sebelumnya tertahan kebijakan browser
    const unlockAudioOnFirstGesture = () => {
      if (this.firstInteractionDone) return;
      this.firstInteractionDone = true;
      window.sfx.init();
      this.applySceneAudioMood(this.state.currentScene);
    };
    window.addEventListener('pointerdown', unlockAudioOnFirstGesture, { once: true });
    window.addEventListener('keydown', unlockAudioOnFirstGesture, { once: true });

    // Klik tombol Play di kotak dialog, karakter Agen FG, atau kotak dialog untuk memutar suara teks
    const btnPlayVoice = document.getElementById('btnPlayFgVoice');
    const fgChar = document.getElementById('consistentFgCharacter');
    const fgDialog = document.getElementById('agenFgDialogBox');
    if (btnPlayVoice) {
      btnPlayVoice.addEventListener('click', (e) => {
        e.stopPropagation();
        this.replayFgSpeech();
      });
    }
    if (fgChar) {
      fgChar.addEventListener('click', () => {
        this.replayFgSpeech();
      });
      fgChar.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.replayFgSpeech();
        }
      });
    }
    if (fgDialog) {
      fgDialog.addEventListener('click', () => {
        this.replayFgSpeech();
      });
    }

    // Consistent Top Scene Navigation Bar
    document.querySelectorAll('.nav-scene-btn[data-scene]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const target = parseInt(btn.dataset.scene, 10);
        if (this.isSceneUnlocked(target)) this.goToScene(target);
      });
    });

    const btnPrev = document.getElementById('btnTopPrevScene');
    const btnNext = document.getElementById('btnTopNextScene');
    if (btnPrev) {
      btnPrev.addEventListener('click', () => {
        if (this.state.currentScene > 1) this.goToScene(this.state.currentScene - 1);
      });
    }
    if (btnNext) {
      btnNext.addEventListener('click', () => {
        const nxt = this.state.currentScene + 1;
        if (nxt <= 5 && this.isSceneUnlocked(nxt)) this.goToScene(nxt);
      });
    }

    // Dialog `>` next action button
    const btnDialogNext = document.getElementById('btnDialogNextAction');
    if (btnDialogNext) {
      btnDialogNext.addEventListener('click', (e) => {
        e.stopPropagation();
        const sc = this.state.currentScene;
        if (sc === 2) {
          this.stepLabLayer();
        } else if (sc < 5 && this.isSceneUnlocked(sc + 1)) {
          this.goToScene(sc + 1);
        } else {
          this.replayFgSpeech();
        }
      });
    }

    // Top-right utilities
    const btnGuide = document.getElementById('btnOpenGuide');
    if (btnGuide) {
      btnGuide.addEventListener('click', () => {
        window.sfx.playClick();
        document.getElementById('dialogGuide').showModal();
      });
    }

    const btnMute = document.getElementById('btnToggleMute');
    if (btnMute) {
      btnMute.addEventListener('click', () => {
        const muted = window.sfx.toggleMute();
        btnMute.textContent = muted ? '🔇 OFF' : '🔊 ON';
      });
    }

    const btnTeacher = document.getElementById('btnOpenTeacher');
    if (btnTeacher) {
      btnTeacher.addEventListener('click', () => {
        window.sfx.playClick();
        document.getElementById('dialogTeacher').showModal();
      });
    }

    const btnUnlockTeacher = document.getElementById('btnUnlockTeacher');
    if (btnUnlockTeacher) {
      btnUnlockTeacher.addEventListener('click', () => {
        const pin = document.getElementById('inputTeacherPin').value.trim();
        if (pin === '7777' || pin.toLowerCase() === 'guru') {
          this.teacherUnlocked = true;
          if (!this.state.studentName) this.state.studentName = 'Instruktur Divisi 7';
          this.state.examPassed = true;
          this.state.examScore = 100;
          this.state.caseSolved = true;
          this.state.rank = 'Detektif';
          window.sfx.playSuccess();
          document.getElementById('dialogTeacher').close();
          this.updateTopHUD();
          this.speakFG('Mode Guru Aktif! Seluruh tombol Scene 1 sampai 5 pada navigasi atas telah dibuka, Agen [KODE]!');
        } else {
          window.sfx.playError();
          alert('PIN salah! Gunakan PIN: 7777');
        }
      });
    }

    // Scene 1: Registration
    const btnReroll = document.getElementById('btnRerollCallsign');
    if (btnReroll) {
      btnReroll.addEventListener('click', () => this.spinCallsign());
    }

    const btnStart = document.getElementById('btnStartAcademy');
    if (btnStart) {
      btnStart.addEventListener('click', () => {
        const nameVal = document.getElementById('inputStudentName').value.trim();
        if (!nameVal) {
          window.sfx.playError();
          document.getElementById('inputStudentName').focus();
          return;
        }
        window.sfx.init();
        window.sfx.playSuccess();
        this.state.studentName = nameVal;
        this.state.rank = 'Detektif';
        this.state.examPassed = false;
        this.state.examScore = 0;
        this.state.caseSolved = false;
        const scoreTxt = document.getElementById('examLiveScoreText');
        if (scoreTxt) {
          scoreTxt.textContent = '0%';
          scoreTxt.style.color = '#facc15';
        }
        this.renderScene3Motherboard();
        this.goToScene(2);
      });
    }

    // Scene 2: Lab X-Ray Scenario Dropdown
    const selectLabScenario = document.getElementById('selectLabScenario');
    if (selectLabScenario) {
      selectLabScenario.addEventListener('change', () => {
        window.sfx.playClick();
        this.state.labScenario = selectLabScenario.value;
        this.selectLabLayer(this.state.activeLabLayer, true);
      });
    }

    // Scene 3: Exam Buttons
    const btnCheckExam = document.getElementById('btnCheckExam');
    if (btnCheckExam) {
      btnCheckExam.addEventListener('click', () => this.evaluateExam());
    }

    const btnQuickFill = document.getElementById('btnExamQuickFill');
    if (btnQuickFill) {
      btnQuickFill.addEventListener('click', () => {
        window.sfx.playSnap();
        OSI_LAYERS_DATA.forEach((l) => {
          const row = document.getElementById(`mbRow_${l.num}`);
          if (!row) return;
          row.querySelector('.mb-sel-pdu').value = l.pdu;
          row.querySelector('.mb-sel-hdr').value = String(l.num);
        });
        this.evaluateExam();
      });
    }

    const btnResetExam = document.getElementById('btnResetExam');
    if (btnResetExam) {
      btnResetExam.addEventListener('click', () => {
        window.sfx.playClick();
        this.renderScene3Motherboard();
      });
    }

    const btnToScene4 = document.getElementById('btnExamToInvestigation');
    if (btnToScene4) {
      btnToScene4.addEventListener('click', () => {
        if (this.state.examPassed || this.teacherUnlocked) this.goToScene(4);
      });
    }

    document.querySelectorAll('[data-quick-pdu]').forEach((btn) => {
      btn.addEventListener('click', () => {
        window.sfx.playSnap();
        document.querySelectorAll('[data-quick-pdu]').forEach((b) => b.classList.remove('selected'));
        btn.classList.add('selected');
        this.speakFG(
          'Ingat aturan unit data paket: Data untuk Lapisan 7 sampai 5, Segment untuk Lapisan 4, Packet untuk Lapisan 3, Frame untuk Lapisan 2, dan Bits untuk Lapisan 1.',
          { audioFile: 'assets/audio/s3_pdu_hint.mp3' }
        );
      });
    });

    // Scene 4: Investigation
    const btnHint = document.getElementById('btnUseHint');
    if (btnHint) {
      btnHint.addEventListener('click', () => this.triggerRadioHint());
    }

    const btnFlag = document.getElementById('btnFlagSelectedLayer');
    if (btnFlag) {
      btnFlag.addEventListener('click', () => this.flagSuspectLayer());
    }

    // Scene 5: Certificate
    const btnPrint = document.getElementById('btnPrintCert');
    if (btnPrint) {
      btnPrint.addEventListener('click', () => {
        window.sfx.playClick();
        window.print();
      });
    }

    const btnNewKadet = document.getElementById('btnResetNewStudent');
    if (btnNewKadet) {
      btnNewKadet.addEventListener('click', () => {
        if (confirm('Mulai ulang untuk Kadet/Siswa baru?')) this.resetAll();
      });
    }
  }

  /* ==========================================================================
     SCENE 2: DUAL SENDER/RECEIVER STACK + FORENSIC X-RAY SCANNER
     ========================================================================== */
  renderScene2Stacks() {
    const senderCol = document.getElementById('senderStackColumn');
    const midCol = document.getElementById('middleLayerLabelsColumn');
    const receiverCol = document.getElementById('receiverStackColumn');
    if (!senderCol || !midCol || !receiverCol) return;

    senderCol.innerHTML = '';
    midCol.innerHTML = '';
    receiverCol.innerHTML = '';

    OSI_LAYERS_DATA.forEach((layer, idx) => {
      const senderOrder = 8 - layer.num; // 1..7 dari Layer 7 ke Layer 1
      const sBtn = document.createElement('button');
      sBtn.type = 'button';
      sBtn.className = 'stack-pill-btn sender';
      sBtn.dataset.layer = layer.num;
      sBtn.innerHTML = `<span>${layer.name}</span><span class="step-flow-tag" title="Urutan ke-${senderOrder} di Pengirim">↓${senderOrder}</span>`;
      sBtn.addEventListener('click', () => {
        this.state.labMode = 'encap';
        if (window.bg3d) window.bg3d.labMode = 'encap';
        document.querySelectorAll('[data-labmode-btn]').forEach((b) => {
          b.classList.toggle('active', b.dataset.labmodeBtn === 'encap');
        });
        this.selectLabLayer(layer.num, true);
      });
      senderCol.appendChild(sBtn);

      const mid = document.createElement('div');
      mid.className = 'stack-mid-label';
      mid.innerHTML = `<span class="flow-arrow-down" style="animation-delay:${(idx * 0.14).toFixed(2)}s">↓</span><span>L${layer.num}</span><span class="flow-arrow-up" style="animation-delay:${((6 - idx) * 0.14).toFixed(2)}s">↑</span>`;
      midCol.appendChild(mid);

      const receiverOrder = layer.num; // 1..7 dari Layer 1 ke Layer 7
      const rBtn = document.createElement('button');
      rBtn.type = 'button';
      rBtn.className = 'stack-pill-btn receiver';
      rBtn.dataset.layer = layer.num;
      rBtn.innerHTML = `<span>${layer.name}</span><span class="step-flow-tag" title="Urutan ke-${receiverOrder} di Penerima">↑${receiverOrder}</span>`;
      rBtn.addEventListener('click', () => {
        this.state.labMode = 'decap';
        if (window.bg3d) window.bg3d.labMode = 'decap';
        document.querySelectorAll('[data-labmode-btn]').forEach((b) => {
          b.classList.toggle('active', b.dataset.labmodeBtn === 'decap');
        });
        this.selectLabLayer(layer.num, true);
      });
      receiverCol.appendChild(rBtn);
    });
  }

  stepLabLayer() {
    const isEncap = this.state.labMode === 'encap';
    let next = this.state.activeLabLayer + (isEncap ? -1 : 1);
    if (next < 1) {
      this.state.labMode = 'decap';
      if (window.bg3d) window.bg3d.labMode = 'decap';
      next = 1;
    } else if (next > 7) {
      this.state.labMode = 'encap';
      if (window.bg3d) window.bg3d.labMode = 'encap';
      next = 7;
    }
    document.querySelectorAll('[data-labmode-btn]').forEach((b) => {
      b.classList.toggle('active', b.dataset.labmodeBtn === this.state.labMode);
    });
    this.selectLabLayer(next, true);
  }

  selectLabLayer(layerNum, playSound = true) {
    this.state.activeLabLayer = layerNum;
    if (!this.state.visitedLayers.includes(layerNum)) {
      this.state.visitedLayers.push(layerNum);
    }
    this.saveState();

    if (window.bg3d) {
      window.bg3d.activeLayer = layerNum;
      window.bg3d.labMode = this.state.labMode;
      window.bg3d.activeScenario = this.state.labScenario || 'chat';
    }

    if (playSound) {
      if (this.state.labMode === 'encap') window.sfx.playWrapHeader();
      else window.sfx.playUnwrapHeader();
    }

    document.querySelectorAll('#senderStackColumn .stack-pill-btn').forEach((b) => {
      b.classList.toggle(
        'active',
        parseInt(b.dataset.layer, 10) === layerNum && this.state.labMode === 'encap'
      );
    });
    document.querySelectorAll('#receiverStackColumn .stack-pill-btn').forEach((b) => {
      b.classList.toggle(
        'active',
        parseInt(b.dataset.layer, 10) === layerNum && this.state.labMode === 'decap'
      );
    });

    const layer = OSI_LAYERS_DATA.find((l) => l.num === layerNum) || OSI_LAYERS_DATA[3];

    const visitedEl = document.getElementById('labVisitedCount');
    if (visitedEl) {
      visitedEl.textContent = `Representasi Proses OSI-Layer (${this.state.visitedLayers.length}/7 Layer Dipelajari)`;
    }

    const barFill = document.getElementById('xrayScannerBarFill');
    if (barFill) {
      const pct = Math.round(((8 - layerNum) / 7) * 100);
      barFill.style.width = `${pct}%`;
    }

    const protoLbl = document.getElementById('xrayProtoLabel');
    const pduLbl = document.getElementById('xrayPduLabel');
    const procTitle = document.getElementById('xrayProcessHeaderTitle');
    const pillEl = document.getElementById('xrayHighlightPill');
    const b1Title = document.getElementById('xrayBox1Title');
    const b1Val = document.getElementById('xrayBox1Val');
    const b2Title = document.getElementById('xrayBox2Title');
    const b2Val = document.getElementById('xrayBox2Val');
    const diagBox = document.getElementById('xrayTechnicalDiagramBox');

    const isChat = (this.state.labScenario || 'chat') === 'chat';
    const scenarioKey = isChat ? 'chat' : 'udp';
    const scDetail =
      (SCENARIO_LAYER_DETAILS[scenarioKey] && SCENARIO_LAYER_DETAILS[scenarioKey][layer.num]) ||
      layer;

    if (protoLbl) protoLbl.textContent = scDetail.proto;
    if (pduLbl) pduLbl.textContent = scDetail.pdu.toUpperCase();
    if (procTitle) procTitle.textContent = scDetail.processTitle;
    if (pillEl) pillEl.textContent = scDetail.highlightPill;
    if (b1Title) b1Title.textContent = scDetail.box1Title;
    if (b1Val) b1Val.textContent = scDetail.box1Val;
    if (b2Title) b2Title.textContent = scDetail.box2Title;
    if (b2Val) b2Val.textContent = scDetail.box2Val;

    if (diagBox) {
      const blocks = scDetail.headerBlocks || [`Header L${layer.num}`, 'Data'];
      const blocksHtml = blocks
        .map((blk, i) => {
          const isHeader = i === 0 && layer.num > 1;
          const isTrailer = i === 2;
          const bg = isHeader
            ? 'rgba(250, 204, 21, 0.22)'
            : isTrailer
            ? 'rgba(74, 222, 128, 0.22)'
            : 'rgba(0, 229, 255, 0.18)';
          const border = isHeader ? '#facc15' : isTrailer ? '#4ade80' : '#00e5ff';
          const color = isHeader ? '#fef08a' : isTrailer ? '#dcfce7' : '#ffffff';
          return `<div style="flex:${isHeader ? '1.3' : '1'};padding:0.36rem 0.42rem;border-radius:5px;background:${bg};border:1.5px solid ${border};color:${color};font-family:var(--font-mono);font-size:0.68rem;font-weight:700;text-align:center;">${blk}</div>`;
        })
        .join('<span style="color:#67e8f9;font-weight:900;font-size:0.8rem;">+</span>');

      diagBox.innerHTML = `
        <div style="font-size:0.67rem;color:#94a3b8;font-weight:700;margin-bottom:0.28rem;text-transform:uppercase;letter-spacing:0.04em;">
          Susunan Paket &amp; Isi Header Layer ${layer.num} (PDU: <span style="color:#fef08a;">${scDetail.pdu.toUpperCase()}</span>)
        </div>
        <div style="display:flex;align-items:center;gap:0.28rem;flex-wrap:wrap;">
          ${blocksHtml}
        </div>
      `;
    }

    if (playSound) {
      const isEncap = this.state.labMode === 'encap';
      if (!isEncap && layer.num === 7) {
        this.speakSequence(
          [
            {
              text: scDetail.decapSpeech,
              audioFile: scDetail.decapAudio
            },
            {
              text: 'Apakah kamu siap mengikuti Ujian kenaikan tingkat? Jika sudah siap mari kita buktikan apakah kamu layak menginvestigasi kasus?',
              audioFile: 'assets/audio/s2_ready_exam.mp3'
            }
          ],
          0
        );
      } else {
        this.speakFG(isEncap ? scDetail.encapSpeech : scDetail.decapSpeech, {
          audioFile: isEncap ? scDetail.encapAudio : scDetail.decapAudio
        });
      }
    }
  }

  /* ==========================================================================
     SCENE 3: UJIAN KADET — 7-LAYER MOTHERBOARD JIGSAW RACK
     ========================================================================== */
  renderScene3Motherboard() {
    const container = document.getElementById('examRackContainer');
    if (!container) return;

    const pduOptions = ['Data', 'Segment', 'Packet', 'Frame', 'Bits'];
    const shuffledHeaders = [...OSI_LAYERS_DATA].sort(() => Math.random() - 0.5);

    const headerBarHtml = `
      <div class="mb-header-row">
        <div>Layer OSI</div>
        <div>PDU</div>
        <div>Isi Header</div>
        <div style="text-align:center;">Status Jawaban</div>
      </div>
    `;

    const rowsHtml = OSI_LAYERS_DATA.map((layer) => {
      const rowPduOpts = [...pduOptions].sort(() => Math.random() - 0.5);
      const rowHdrOpts = [...OSI_LAYERS_DATA].sort(() => Math.random() - 0.5);
      const initPdu = rowPduOpts[0];
      const initHdr = rowHdrOpts[0].num;
      return `
        <div class="mb-row" id="mbRow_${layer.num}">
          <div class="mb-layer-box">
            <strong style="color:#ffffff;">Layer ${layer.num}</strong><br />
            <span style="color:#cbd5e1;">${layer.name}</span>
          </div>
          <div class="mb-callout-card">
            <select class="mb-select mb-sel-pdu" data-layer="${layer.num}" aria-label="PDU Layer ${layer.num}">
              ${rowPduOpts
                .map((p) => `<option value="${p}" ${p === initPdu ? 'selected' : ''}>${p}</option>`)
                .join('')}
            </select>
            <select class="mb-select mb-sel-hdr" data-layer="${layer.num}" aria-label="Isi Header Layer ${layer.num}">
              ${rowHdrOpts
                .map(
                  (h) =>
                    `<option value="${h.num}" ${h.num === initHdr ? 'selected' : ''}>${h.headerLabel}</option>`
                )
                .join('')}
            </select>
          </div>
          <div class="mb-answer-status" id="mbStatus_${layer.num}">
            Belum Diperiksa
          </div>
        </div>
      `;
    }).join('');

    container.innerHTML = headerBarHtml + rowsHtml;

    container.querySelectorAll('select').forEach((sel) => {
      sel.addEventListener('change', () => {
        window.sfx.playSnap();
      });
    });
  }

  evaluateExam() {
    let correct = 0;
    const total = 14;

    OSI_LAYERS_DATA.forEach((layer) => {
      const row = document.getElementById(`mbRow_${layer.num}`);
      const statusBox = document.getElementById(`mbStatus_${layer.num}`);
      if (!row) return;

      const pduVal = row.querySelector('.mb-sel-pdu').value;
      const hdrVal = parseInt(row.querySelector('.mb-sel-hdr').value, 10);

      const pduOk = pduVal === layer.pdu;
      const hdrOk = hdrVal === layer.num;
      if (pduOk) correct++;
      if (hdrOk) correct++;

      row.classList.remove('correct', 'wrong');
      if (pduOk && hdrOk) {
        row.classList.add('correct');
        if (statusBox) statusBox.textContent = '✓ BENAR';
      } else {
        row.classList.add('wrong');
        if (statusBox) statusBox.textContent = '✕ SALAH';
      }
    });

    const pct = Math.round((correct / total) * 100);
    this.state.examScore = pct;
    const scoreTxt = document.getElementById('examLiveScoreText');
    if (scoreTxt) {
      scoreTxt.textContent = `${pct}%`;
      scoreTxt.style.color = pct >= 80 ? '#4ade80' : '#f87171';
    }

    const btnToS4 = document.getElementById('btnExamToInvestigation');

    if (pct >= 80) {
      this.state.examPassed = true;
      this.state.rank = 'Detektif';
      this.saveState();
      this.updateTopHUD();
      window.sfx.playFanfare();
      if (btnToS4) {
        btnToS4.style.display = 'inline-flex';
        btnToS4.disabled = false;
      }
      this.speakSequence(
        [
          {
            text: 'Selamat! Kamu berhasil lulus Ujian Kenaikan Tingkat dengan sangat baik.',
            audioFile: 'assets/audio/s3_pass_1.mp3'
          },
          {
            text: 'Sekarang kamu resmi siap melakukan investigasi kasus nyata untuk menjadi Detektif Legendaris.',
            audioFile: 'assets/audio/s3_pass_2.mp3'
          }
        ],
        0
      );
    } else {
      this.state.examPassed = false;
      this.saveState();
      this.updateTopHUD();
      window.sfx.playError();
      if (btnToS4) {
        btnToS4.style.display = 'none';
        btnToS4.disabled = true;
      }
      this.speakSequence(
        [
          {
            text: 'Skor ujianmu masih di bawah batas kelulusan 80 persen.',
            audioFile: 'assets/audio/s3_fail_1.mp3'
          },
          {
            text: 'Perhatikan baris sirkuit yang berwarna merah, perbaiki susunannya, lalu klik Periksa kembali.',
            audioFile: 'assets/audio/s3_fail_2.mp3'
          }
        ],
        0
      );
    }
  }

  /* ==========================================================================
     SCENE 4: MEJA INVESTIGASI KASUS
     ========================================================================== */
  selectCase(idx) {
    this.state.activeCaseIndex = idx;
    this.state.hintUsed = false;
    this.state.culpritFound = false;
    const caseObj = INVESTIGATION_CASES[idx];
    const alreadySolved =
      Array.isArray(this.state.solvedCaseIds) &&
      caseObj &&
      this.state.solvedCaseIds.includes(caseObj.id);
    this.state.caseSolved = Boolean(alreadySolved);
    this.state.culpritFound = Boolean(alreadySolved);
    this.state.selectedScanLayer = 7;
    this.saveState();
    this.renderScene4Investigation();
    this.speakSequence(INVESTIGATION_CASES[idx].fgBriefingSeq, 0);
  }

  renderScene4Investigation() {
    const c = INVESTIGATION_CASES[this.state.activeCaseIndex];
    if (!c) return;
    const solvedIds = Array.isArray(this.state.solvedCaseIds) ? this.state.solvedCaseIds : [];
    const allDone = this.allCasesSolved();
    const nextUnsolvedIdx = INVESTIGATION_CASES.findIndex((item) => !solvedIds.includes(item.id));

    const tabsEl = document.getElementById('caseSelectorTabs');
    if (tabsEl) {
      tabsEl.innerHTML = INVESTIGATION_CASES.map((item, idx) => {
        const isDone = solvedIds.includes(item.id);
        return `
          <button type="button" class="nav-scene-btn ${idx === this.state.activeCaseIndex ? 'active' : ''}" data-case-tab="${idx}" style="padding:0.15rem 0.45rem;font-size:0.68rem;">
            ${item.id}${isDone ? ' ✓' : ''}
          </button>
        `;
      }).join('');
      tabsEl.querySelectorAll('[data-case-tab]').forEach((b) => {
        b.addEventListener('click', () => {
          window.sfx.playClick();
          this.selectCase(parseInt(b.dataset.caseTab, 10));
        });
      });
    }

    const titleEl = document.getElementById('caseTitleDisplay');
    const reportEl = document.getElementById('caseVictimReport');
    if (titleEl) titleEl.textContent = c.title;
    if (reportEl) reportEl.textContent = c.victimReport;

    const listEl = document.getElementById('scannerLayersList');
    if (listEl) {
      listEl.innerHTML = OSI_LAYERS_DATA.map((layer) => {
        const st = c.layersStatus[layer.num];
        const isSel = this.state.selectedScanLayer === layer.num;
        const isFixed = this.state.caseSolved && layer.num === c.culpritLayer;

        let pillCls = 'diag-pill-btn';
        if (isSel) pillCls += ' selected-scan';
        if (isFixed) pillCls += ' fixed-green';

        return `
          <div class="diag-row">
            <div class="diag-layer-label">Layer ${layer.num}</div>
            <button type="button" class="${pillCls}" data-diag-layer="${layer.num}">
              ${isFixed ? `Layer ${layer.num} (${layer.name} — DIPULIHKAN)` : `${st.label} (PDU: ${layer.pdu})`}
            </button>
          </div>
        `;
      }).join('');

      listEl.querySelectorAll('[data-diag-layer]').forEach((btn) => {
        btn.addEventListener('click', () => {
          window.sfx.playScan();
          this.state.selectedScanLayer = parseInt(btn.dataset.diagLayer, 10);
          this.renderScene4Investigation();
        });
      });
    }

    const selLayer = this.state.selectedScanLayer || 7;
    const stObj = c.layersStatus[selLayer];
    const alertTitle = document.getElementById('scannerAlertTitle');
    const alertDesc = document.getElementById('scannerAlertDesc');
    const btnFlag = document.getElementById('btnFlagSelectedLayer');

    if (alertTitle && alertDesc && stObj) {
      if (allDone) {
        alertTitle.textContent = 'SELURUH KASUS TUNTAS (3/3 SELESAI)!';
        alertTitle.style.color = '#facc15';
        alertDesc.textContent = 'Semua kasus investigasi berhasil dipecahkan! Masuk ke Ruang Detektif Legendaris.';
      } else if (this.state.caseSolved) {
        alertTitle.textContent = 'STATUS JARINGAN: NORMAL (PULIH)';
        alertTitle.style.color = '#4ade80';
        alertDesc.textContent = 'Masalah OSI Layer pada kasus ini telah berhasil diperbaiki!';
      } else {
        alertTitle.textContent = `HASIL PEMINDAIAN LAYER ${selLayer} (${stObj.label.toUpperCase()})`;
        alertTitle.style.color = '#67e8f9';
        alertDesc.textContent = stObj.msg;
      }
    }

    if (btnFlag) {
      if (allDone) {
        btnFlag.disabled = false;
        btnFlag.style.background = 'linear-gradient(90deg, #facc15, #ca8a04)';
        btnFlag.style.borderColor = '#fef08a';
        btnFlag.style.color = '#020814';
        btnFlag.textContent = '🏆 MASUK KE RUANG DETEKTIF LEGENDARIS ➔';
      } else if (this.state.caseSolved && nextUnsolvedIdx !== -1) {
        btnFlag.disabled = false;
        btnFlag.style.background = 'rgba(20, 83, 45, 0.85)';
        btnFlag.style.borderColor = '#4ade80';
        btnFlag.style.color = '#ffffff';
        btnFlag.textContent = `➡️ LANJUT KE KASUS ${INVESTIGATION_CASES[nextUnsolvedIdx].id}`;
      } else {
        btnFlag.disabled = this.state.culpritFound || this.state.caseSolved;
        btnFlag.style.background = this.state.culpritFound
          ? 'rgba(20, 83, 45, 0.55)'
          : 'rgba(2, 132, 199, 0.35)';
        btnFlag.style.borderColor = this.state.culpritFound ? '#4ade80' : '#00e5ff';
        btnFlag.style.color = '#ffffff';
        btnFlag.textContent = this.state.culpritFound
          ? `✅ LAYER ${c.culpritLayer} DITANDAI — SELESAIKAN PUZZLE KANAN`
          : `🔍 TANDAI LAYER ${selLayer} SEBAGAI SUMBER MASALAH`;
      }
    }

    const bitsOverlay = document.getElementById('rj45BitsOverlay');
    if (bitsOverlay) {
      bitsOverlay.textContent = this.state.caseSolved ? 'STATUS: PULIH' : 'STATUS: GANGGUAN';
      bitsOverlay.style.color = this.state.caseSolved ? '#4ade80' : '#facc15';
    }

    const puzzleBox = document.getElementById('miniPuzzleContainer');
    if (puzzleBox) {
      if (!this.state.culpritFound) {
        puzzleBox.innerHTML = `
          <div style="background:rgba(4,14,28,0.9);border:1px dashed rgba(0,229,255,0.45);border-radius:6px;padding:0.6rem;text-align:center;font-size:0.74rem;color:#cbd5e1;">
            🔒 <strong>Mini-Puzzle Terkunci:</strong><br />
            Analisis laporan kasus dan pindai ke-7 layer di tengah, lalu klik <strong>Tandai Layer</strong> untuk membuka tindakan perbaikan!
          </div>
        `;
      } else {
        const optionsHtml = (c.repairOptions || [])
          .map((opt) => `<option value="${opt.val}">${opt.text}</option>`)
          .join('');
        let nextActionBtnHtml = '';
        if (allDone) {
          nextActionBtnHtml = `
            <button type="button" class="sb-cyan-cta" style="margin-top:0.42rem;padding:0.5rem;font-size:0.75rem;background:linear-gradient(90deg,#facc15,#eab308);color:#020814;box-shadow:0 0 16px rgba(250,204,21,0.75);" id="btnGoToScene5">
              🏆 MASUK KE RUANG DETEKTIF LEGENDARIS ➔
            </button>
          `;
        } else if (this.state.caseSolved && nextUnsolvedIdx !== -1) {
          nextActionBtnHtml = `
            <button type="button" class="sb-cyan-cta" style="margin-top:0.42rem;padding:0.46rem;font-size:0.74rem;" id="btnNextUnsolvedCase">
              ➡️ LANJUT KE KASUS ${INVESTIGATION_CASES[nextUnsolvedIdx].id}
            </button>
          `;
        }
        puzzleBox.innerHTML = `
          <div style="background:rgba(4,14,28,0.92);border:1px solid rgba(0,229,255,0.5);border-radius:6px;padding:0.55rem;">
            <div style="font-size:0.74rem;font-weight:800;color:var(--cyan-bright);margin-bottom:0.3rem;">
              PILIH TINDAKAN PERBAIKAN LAYER ${c.culpritLayer}:
            </div>
            <select id="selectRepairOption" class="sb-input" style="margin-bottom:0.45rem;padding:0.36rem;font-size:0.72rem;" ${this.state.caseSolved ? 'disabled' : ''}>
              ${optionsHtml}
            </select>
            <button type="button" class="sb-cyan-cta" style="padding:0.48rem;font-size:0.76rem;" id="btnExecuteRepair" ${this.state.caseSolved ? 'disabled' : ''}>
              ${this.state.caseSolved ? '✅ PERBAIKAN SELESAI (+50 POIN)' : '⚡ TERAPKAN PERBAIKAN & PULIHKAN PAKET'}
            </button>
            ${nextActionBtnHtml}
          </div>
        `;
        const btnExec = document.getElementById('btnExecuteRepair');
        if (btnExec) {
          btnExec.onclick = () => {
            const val = document.getElementById('selectRepairOption').value;
            if (val !== 'ok') {
              window.sfx.playError();
              this.state.caseScore = Math.max(0, this.state.caseScore - 10);
              this.saveState();
              this.updateTopHUD();
              this.speakFG('Pilihan perbaikan belum tepat sehingga skor berkurang 10 poin. Analisis kembali tindakan teknis yang paling tepat untuk lapisan tersebut.', {
                audioFile: 'assets/audio/s4_repair_err.mp3'
              });
              return;
            }
            window.sfx.playFanfare();
            if (!Array.isArray(this.state.solvedCaseIds)) this.state.solvedCaseIds = [];
            if (!this.state.solvedCaseIds.includes(c.id)) {
              this.state.solvedCaseIds.push(c.id);
              this.state.caseScore += 50;
            }
            this.state.caseSolved = true;
            this.state.rank = 'Detektif Legendaris';
            this.saveState();
            this.renderScene4Investigation();
            this.updateTopHUD();
            this.speakFG(c.fgSuccess, { audioFile: c.fgSuccessAudio });
            if (this.allCasesSolved()) {
              setTimeout(() => {
                if (this.state.currentScene === 4 && this.allCasesSolved()) {
                  this.goToScene(5);
                }
              }, 4800);
            }
          };
        }
        const btnGoS5 = document.getElementById('btnGoToScene5');
        if (btnGoS5) {
          btnGoS5.onclick = () => {
            this.goToScene(5);
          };
        }
        const btnNextCase = document.getElementById('btnNextUnsolvedCase');
        if (btnNextCase && nextUnsolvedIdx !== -1) {
          btnNextCase.onclick = () => {
            window.sfx.playClick();
            this.selectCase(nextUnsolvedIdx);
          };
        }
      }
    }

    this.updateTopHUD();
  }

  triggerRadioHint() {
    if (this.state.caseSolved) return;
    window.sfx.playRadioStatic();
    this.state.hintUsed = true;
    this.state.caseScore = Math.max(0, this.state.caseScore - 15);
    this.saveState();
    this.updateTopHUD();
    const c = INVESTIGATION_CASES[this.state.activeCaseIndex];
    this.speakFG(c.fgHint, { audioFile: c.fgHintAudio });
  }

  flagSuspectLayer() {
    if (this.allCasesSolved()) {
      this.goToScene(5);
      return;
    }
    if (this.state.caseSolved) {
      const solvedIds = Array.isArray(this.state.solvedCaseIds) ? this.state.solvedCaseIds : [];
      const nextUnsolvedIdx = INVESTIGATION_CASES.findIndex((item) => !solvedIds.includes(item.id));
      if (nextUnsolvedIdx !== -1) {
        window.sfx.playClick();
        this.selectCase(nextUnsolvedIdx);
      }
      return;
    }
    const c = INVESTIGATION_CASES[this.state.activeCaseIndex];
    const picked = this.state.selectedScanLayer;
    if (!c || this.state.culpritFound) return;

    if (picked === c.culpritLayer) {
      window.sfx.playSuccess();
      this.state.culpritFound = true;
      this.saveState();
      this.renderScene4Investigation();
      this.speakSequence(
        [
          {
            text: 'Tepat sekali! Kamu berhasil menemukan lapisan yang menjadi sumber masalah jaringan.',
            audioFile: 'assets/audio/s4_flag_ok_1.mp3'
          },
          {
            text: 'Sekarang pilih tindakan perbaikan yang tepat pada jendela Mini-Puzzle di sebelah kanan.',
            audioFile: 'assets/audio/s4_flag_ok_2.mp3'
          }
        ],
        0
      );
    } else {
      window.sfx.playError();
      this.state.caseScore = Math.max(0, this.state.caseScore - 10);
      this.saveState();
      this.updateTopHUD();
      this.speakFG(
        'Bukan di lapisan tersebut. Periksa kembali kesesuaian PDU dan isi header pada tiap lapisan dengan laporan kasus.',
        { audioFile: 'assets/audio/s4_flag_err.mp3' }
      );
    }
  }

  /* ==========================================================================
     SCENE 5: DIGITAL CERTIFICATE OF HONOR
     ========================================================================== */
  renderCertificate() {
    const code = this.state.callsign || 'K7X9';
    const name = this.state.studentName || 'Kadet Divisi 7';
    const cls = this.state.studentClass || 'X TKJ 1';
    const examPct = this.state.examScore || 0;
    const score = this.state.caseScore;
    const graduated = this.isGraduated();

    const elTitleStatus = document.getElementById('certTitleStatus');
    const elCallsign = document.getElementById('certCallsignBadge');
    const elName = document.getElementById('certStudentName');
    const elClass = document.getElementById('certStudentClass');
    const elExam = document.getElementById('certExamScore');
    const elScore = document.getElementById('certCaseScore');

    if (elTitleStatus) {
      elTitleStatus.textContent = graduated
        ? 'DETEKTIF LEGENDARIS DIVISI 7'
        : 'KADET DALAM PELATIHAN (BELUM LULUS)';
      elTitleStatus.style.color = graduated ? '#facc15' : '#94a3b8';
    }
    if (elCallsign) elCallsign.textContent = `AGEN ${code}`;
    if (elName) elName.textContent = name;
    if (elClass) elClass.textContent = cls;
    if (elExam) elExam.textContent = `${examPct}% ${examPct >= 80 ? 'Complete (LULUS)' : '(Belum Lulus)'}`;
    if (elScore) elScore.textContent = `${score} Poin ${this.allCasesSolved() ? '(TUNTAS)' : '(Belum Selesai)'}`;
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.game = new Divisi7Game();
  window.game.init();
});
