// Haftalık özetler. BSM 451 Ağ Programlama, 1–5. haftalar (vize konuları).
const WEEKS = [
{
  id: 1,
  title: "OSI Referans Modeli ve Katmanlı Yapı",
  short: "Ağların sınıflandırılması, standart kuruluşları, OSI'nin 7 katmanı, TCP/IP karşılaştırması, adresler ve ara bağlantı cihazları.",
  principle: "Her katman yalnızca kendi işini yapar ve alt katmanın hizmetini kullanır; veri aşağı inerken başlık eklenir (kapsülleme), yukarı çıkarken çıkarılır.",
  body: `
<h2>1. Bilgisayar ağlarının sınıflandırılması</h2>
<div class="table-wrap"><table>
<tr><th>Ölçüt</th><th>Türler</th></tr>
<tr><td>Coğrafi boyut</td><td>PAN (kişisel) · LAN (yerel) · MAN (şehir) · WAN (geniş alan)</td></tr>
<tr><td>Topoloji</td><td>Ortak yol (bus) · yıldız · halka · ağ (mesh) · ağaç / karma</td></tr>
<tr><td>İletim ortamı</td><td>Kablolu (bakır, fiber) · kablosuz (radyo, mikrodalga, kızılötesi)</td></tr>
<tr><td>Bağlantı tipi</td><td>Noktadan noktaya · çok noktalı</td></tr>
<tr><td>Yönetim modeli</td><td>İstemci–sunucu · eşler arası (P2P)</td></tr>
</table></div>

<h2>2. Standart kuruluşları</h2>
<div class="table-wrap"><table>
<tr><th>Kuruluş</th><th>Görevi</th></tr>
<tr><td><b>ISOC</b> (Internet Society)</td><td>İnternetin gelişimini destekleyen çatı kuruluş</td></tr>
<tr><td><b>IAB</b> (Internet Architecture Board)</td><td>Teknik danışman; IETF ve IRTF'yi denetler</td></tr>
<tr><td><b>IETF</b></td><td>İnternet protokol standartlarını (RFC) geliştirir</td></tr>
<tr><td><b>IEEE</b></td><td>LAN standartları: 802.3 Ethernet, 802.11 kablosuz</td></tr>
<tr><td><b>ISO</b></td><td>OSI referans modelini tanımladı</td></tr>
<tr><td>EIA / TIA</td><td>Kablolama ve arayüz standartları</td></tr>
<tr><td>ITU-T</td><td>Telekomünikasyon standartları</td></tr>
<tr><td><b>ICANN / IANA</b></td><td>Alan adları, IP adresleri ve port numaralarının dağıtımı</td></tr>
</table></div>

<h2>3. OSI referans modeli</h2>
<div class="table-wrap"><table>
<tr><th>#</th><th>Katman</th><th>Görevi</th><th>Veri birimi (PDU)</th><th>Örnek</th></tr>
<tr><td>7</td><td>Uygulama</td><td>Kullanıcıya ağ hizmeti</td><td>Mesaj</td><td>HTTP, FTP, SMTP, DNS</td></tr>
<tr><td>6</td><td>Sunum</td><td>Kodlama, şifreleme, sıkıştırma</td><td>Mesaj</td><td>ASCII, JPEG, TLS</td></tr>
<tr><td>5</td><td>Oturum</td><td>Diyalog kontrolü, senkronizasyon noktaları</td><td>Mesaj</td><td>RPC, NetBIOS</td></tr>
<tr><td>4</td><td>Taşıma</td><td>Prosesten prosese teslim, port, segmentasyon, akış ve hata kontrolü</td><td>Segment / datagram</td><td>TCP, UDP</td></tr>
<tr><td>3</td><td>Ağ</td><td>Kaynaktan hedefe teslim, mantıksal (IP) adres, yönlendirme</td><td>Paket / datagram</td><td>IP, ICMP, ARP*</td></tr>
<tr><td>2</td><td>Veri bağı</td><td>Düğümden düğüme teslim, fiziksel (MAC) adres, çerçeveleme, erişim kontrolü</td><td>Çerçeve (frame)</td><td>Ethernet, PPP</td></tr>
<tr><td>1</td><td>Fiziksel</td><td>Bitlerin ortamda iletimi, sinyal, bağlantı yapısı</td><td>Bit</td><td>Kablo, hub</td></tr>
</table></div>
<p>* ARP derste <b>2. katman protokolü</b> olarak işlenir (Ethernet çerçevesine doğrudan konur, EtherType 0x0806); TCP/IP kitaplarında ağ katmanının yardımcı protokolü olarak da geçer.</p>
<div class="box tip"><span class="label">Ezber cümlesi</span>Aşağıdan yukarı: <b>F</b>iziksel · <b>V</b>eri bağı · <b>A</b>ğ · <b>T</b>aşıma · <b>O</b>turum · <b>S</b>unum · <b>U</b>ygulama. İngilizce: "Please Do Not Throw Sausage Pizza Away".</div>

<h2>4. Kapsülleme</h2>
<div class="formula">Uygulama verisi
 └─ TCP başlığı + veri                        = segment        (taşıma)
     └─ IP başlığı + segment                  = datagram       (ağ)
         └─ Ethernet başlığı + datagram + CRC = çerçeve        (veri bağı)
             └─ bitler                                         (fiziksel)</div>
<p>Alıcıda ters işlem yapılır (decapsulation): her katman kendi başlığını okuyup çıkarır, yükü üst katmana verir. Eşler arası iletişim aynı katmanlar arasındadır.</p>

<h2>5. OSI ↔ TCP/IP</h2>
<div class="table-wrap"><table>
<tr><th>OSI</th><th>TCP/IP</th></tr>
<tr><td>Uygulama · Sunum · Oturum</td><td>Uygulama</td></tr>
<tr><td>Taşıma</td><td>Taşıma (TCP, UDP, SCTP)</td></tr>
<tr><td>Ağ</td><td>İnternet / ağ (IP, ICMP, IGMP, ARP)</td></tr>
<tr><td>Veri bağı · Fiziksel</td><td>Ağ erişimi (veri bağı + fiziksel)</td></tr>
</table></div>
<p>OSI teorik bir referans modelidir; internet TCP/IP üzerine kuruludur. TCP/IP hiyerarşiktir ama katmanları tam bağımsız değildir.</p>

<h2>6. Adresleme</h2>
<div class="table-wrap"><table>
<tr><th>Adres</th><th>Katman</th><th>Boyut / örnek</th></tr>
<tr><td>Fiziksel (MAC)</td><td>Veri bağı</td><td>48 bit, ör. 07:01:02:01:2C:4B</td></tr>
<tr><td>Mantıksal (IP)</td><td>Ağ</td><td>IPv4 32 bit, IPv6 128 bit</td></tr>
<tr><td>Port</td><td>Taşıma</td><td>16 bit (0–65535), ör. 80 HTTP, 53 DNS</td></tr>
<tr><td>Özel adres</td><td>Uygulama</td><td>URL, e-posta adresi</td></tr>
</table></div>

<h2>7. Ara bağlantı cihazları</h2>
<div class="table-wrap"><table>
<tr><th>Cihaz</th><th>Katman</th><th>İşlevi</th></tr>
<tr><td>Tekrarlayıcı (repeater), hub</td><td>1</td><td>Sinyali yeniler / tüm portlara aynen iletir; tek çarpışma alanı</td></tr>
<tr><td>Köprü (bridge), anahtar (switch)</td><td>2</td><td>MAC tablosuyla çerçeveyi yalnızca hedef porta iletir; her port ayrı çarpışma alanı</td></tr>
<tr><td>Yönlendirici (router)</td><td>3</td><td>IP adresine göre ağlar arası yönlendirme; yayın (broadcast) alanlarını ayırır</td></tr>
<tr><td>Ağ geçidi (gateway)</td><td>4–7</td><td>Farklı protokol yığınları arasında dönüşüm</td></tr>
</table></div>
`
},
{
  id: 2,
  title: "Katman 2 Protokolleri ve PCAP",
  short: "Ethernet ve CSMA/CD, geri çekilme (backoff), çerçeve yapısı, iletim şekilleri, ARP paketi, libpcap ve Wireshark, ARP gönderen C kodu.",
  principle: "IP datagramı teslim edilmeden önce bir çerçeveye konur; çerçeve için alıcının MAC adresi gerekir, onu ARP bulur.",
  body: `
<h2>1. Ethernet (IEEE 802.3)</h2>
<p>En yaygın LAN veri bağı protokolü. Kökeni 1960'lardaki <b>ALOHAnet</b> radyo ağına dayanır. Tercih sebepleri: kurulum kolaylığı, güvenilirlik, ölçeklenebilirlik, farklı kullanım türlerine uyum.</p>
<h3>CSMA/CD</h3>
<div class="table-wrap"><table>
<tr><th>Kısım</th><th>Anlamı</th></tr>
<tr><td><b>CS</b> — Carrier Sense (taşıyıcı sezme)</td><td>Göndermeden önce hatta iletim var mı dinlenir</td></tr>
<tr><td><b>MA</b> — Multiple Access (çoklu erişim)</td><td>Hattaki tüm düğümler eşit erişim hakkına sahiptir</td></tr>
<tr><td><b>CD</b> — Collision Detection (çarpışma sezme)</td><td>İki düğüm aynı anda gönderirse çarpışma anlaşılır, sıkışma (jam) sinyali yollanır</td></tr>
</table></div>
<h3>Geri çekilme (binary exponential backoff)</h3>
<div class="formula">n. çarpışmadan sonra:  k ∈ {0, 1, …, 2^min(n,10) − 1} rastgele seçilir
bekleme = k × slot zamanı          (10 Mbps Ethernet'te slot = 512 bit süresi = 51,2 µs)
16 denemeden sonra çerçeve atılır ve üst katmana hata bildirilir</div>
<p>Çarpışma sayısı arttıkça bekleme aralığı ikiye katlanır; yoğun hatta tekrar çarpışma olasılığı düşer.</p>

<h2>2. Ethernet çerçevesi</h2>
<div class="table-wrap"><table>
<tr><th>Alan</th><th>Boyut</th><th>Not</th></tr>
<tr><td>Önsöz (preamble) + SFD</td><td>7 + 1 = 8 bayt</td><td>10101010… senkronizasyon; SFD 10101011 çerçevenin başını gösterir (fiziksel katman ekler)</td></tr>
<tr><td>Hedef MAC</td><td>6 bayt</td><td>ff:ff:ff:ff:ff:ff = yayın</td></tr>
<tr><td>Kaynak MAC</td><td>6 bayt</td><td></td></tr>
<tr><td>Tip / uzunluk</td><td>2 bayt</td><td><b>0x0800 IPv4</b>, <b>0x0806 ARP</b>, 0x86DD IPv6</td></tr>
<tr><td>Veri</td><td>46–1500 bayt</td><td>46'dan kısaysa dolgu (padding) eklenir</td></tr>
<tr><td>CRC (FCS)</td><td>4 bayt</td><td>Hata sezme</td></tr>
</table></div>
<p>Çerçeve boyu (önsöz hariç) en az <b>64</b>, en çok <b>1518</b> bayt. En az uzunluk, gönderen çarpışmayı çerçeveyi bitirmeden sezebilsin diye vardır.</p>
<h3>İletim şekilleri</h3>
<div class="table-wrap"><table>
<tr><th>Tür</th><th>Hedef adres</th></tr>
<tr><td>Tekli (unicast)</td><td>İlk baytın en düşük biti 0</td></tr>
<tr><td>Çoklu (multicast)</td><td>İlk baytın en düşük biti 1</td></tr>
<tr><td>Yayın (broadcast)</td><td>Tüm bitler 1: FF:FF:FF:FF:FF:FF</td></tr>
</table></div>

<h2>3. ARP (Address Resolution Protocol)</h2>
<p>Teslim için iki adres gerekir: <b>mantıksal (IP)</b> ve <b>fiziksel (MAC)</b>. ARP, IP adresini MAC adresine eşler (eşleme statik tabloyla ya da dinamik olarak yapılabilir; tersini eski RARP yapardı).</p>
<ol>
<li>Gönderen hedefin IP'sini bilir ama MAC'ini bilmez → <b>ARP isteği</b>ni <b>yayın</b> olarak gönderir (hedef MAC ff:ff:ff:ff:ff:ff).</li>
<li>Herkes alır, yalnızca IP'si eşleşen düğüm <b>ARP cevabı</b>nı <b>tekli (unicast)</b> olarak gönderir.</li>
<li>Gönderen eşlemeyi ARP önbelleğine yazar, datagramı çerçeveleyip yollar.</li>
</ol>
<div class="table-wrap"><table>
<tr><th>ARP paketi alanı</th><th>Boyut</th><th>Ethernet/IPv4 değeri</th></tr>
<tr><td>Donanım tipi (HTYPE)</td><td>2</td><td>1 (Ethernet)</td></tr>
<tr><td>Protokol tipi (PTYPE)</td><td>2</td><td>0x0800 (IPv4)</td></tr>
<tr><td>Donanım adres uzunluğu</td><td>1</td><td>6</td></tr>
<tr><td>Protokol adres uzunluğu</td><td>1</td><td>4</td></tr>
<tr><td>İşlem (opcode)</td><td>2</td><td><b>1 = istek, 2 = cevap</b></td></tr>
<tr><td>Gönderen MAC · Gönderen IP</td><td>6 · 4</td><td></td></tr>
<tr><td>Hedef MAC · Hedef IP</td><td>6 · 4</td><td>İstekte hedef MAC 00:00:00:00:00:00</td></tr>
</table></div>
<p>ARP paketi <b>28 bayttır</b>; 14 baytlık Ethernet başlığıyla <b>42 bayt</b> eder (CRC ve dolgu kart tarafından eklenir).</p>
<p><b>Kullanım durumları:</b> 1) host → aynı ağdaki host 2) host → başka ağdaki host (router'ın MAC'i sorulur) 3) router → başka ağdaki host (sonraki router) 4) router → aynı ağdaki host.</p>

<h2>4. PCAP ve libpcap</h2>
<p><b>PCAP (Packet Capture)</b>: ağ etkinliğinin (2.–7. katman) tam kaydı. En yaygın uygulaması <b>libpcap</b> (Windows'ta WinPcap/Npcap): açık kaynak, *nix ve Windows uyumlu C kütüphanesi.</p>
<p>Kullanım alanları: trafik dinleme · bant genişliği kontrolü · pasif DNS çözümleme · saldırı girişimlerini görme · araştırma testleri. Yakalama noktası: <b>tap</b>, anahtarda <b>izleme (mirror/SPAN) portu</b> ya da hat içi cihaz.</p>
<details class="example" open><summary>Depolama hesabı</summary><div class="inner">
<div class="formula">1 Gbps × 3600 × 24 s = 86.400 gigabit = 86.400 / 8 = 10.800 GB / gün
64 baytlık paketlerle: 10⁹ / (64 × 8) = 1.953.125 paket/s</div>
<p>pcap dosyası: <b>24 baytlık dosya başlığı</b>, sonra her paket için kayıt başlığı + paket verisi. Paketler küçüldükçe paket sayısı ve dolayısıyla başlık yükü artar (sunumdaki tabloda 64 baytta günde ~629 GB ek yük).</p>
</div></details>
<h3>Ağ dinleme araçları (sniffer)</h3>
<p>Trafiği sezen, çözen (ve değiştirebilen) donanım + yazılım. <b>Pasif</b> (izleme) ya da <b>aktif</b> (saldırı). Örnekler: Wireshark, Ethereal, tcpdump, WinDump.</p>
<ul>
<li><b>Sistem yöneticisi:</b> problem ve performans analizi, saldırı tespiti, uygulama testi.</li>
<li><b>Saldırgan:</b> FTP, POP3, IMAP, SMTP, rlogin, HTTP gibi şifresiz protokollerden pasif veri toplama, trafik desenini keşfetme.</li>
</ul>
<p><b>Wireshark:</b> Gerald Combs'un <b>Ethereal</b> projesi; ilk sürüm <b>1998</b>, adı <b>Haziran 2006</b>'da Wireshark oldu. Paket sniffer'dır (ağ haritası çıkarmaz), tcpdump'a benzer, 750'den fazla protokol, GUI + komut satırı, yalnızca pcap'in desteklediği ağlarda yakalar, <b>pasiftir, trafik üretmez</b>. Katmanlar: Wireshark → WinPcap/libpcap → işletim sistemi → kart sürücüsü → kart.</p>
<h3>libpcap fonksiyonları</h3>
<div class="table-wrap"><table>
<tr><th>Fonksiyon</th><th>Görevi</th></tr>
<tr><td><code>pcap_lookupdev(errbuf)</code></td><td>Varsayılan ağ arayüzünü bulur</td></tr>
<tr><td><code>pcap_lookupnet(dev, &ip, &mask, errbuf)</code></td><td>Arayüzün ağ adresi ve maskesi</td></tr>
<tr><td><code>pcap_open_live(dev, snaplen, promisc, to_ms, errbuf)</code></td><td>Yakalama oturumu açar. snaplen: paket başına yakalanacak bayt; promisc 1: karışık mod (tüm trafiği al)</td></tr>
<tr><td><code>pcap_compile</code> + <code>pcap_setfilter</code></td><td>BPF filtre ifadesini derleyip uygular (ör. "icmp && dst 10.0.0.5")</td></tr>
<tr><td><code>pcap_loop(handle, n, callback, args)</code> / <code>pcap_next</code></td><td>n paket yakalayıp her biri için callback çağırır (n = 0 ya da −1: sonsuz)</td></tr>
<tr><td><code>pcap_sendpacket(handle, buf, len)</code></td><td>Elle hazırlanan ham çerçeveyi gönderir</td></tr>
<tr><td><code>pcap_close</code></td><td>Oturumu kapatır</td></tr>
</table></div>

<h2>5. Kod: arpgonder.c</h2>
<p>Derste verilen kod, 42 baytlık bir diziye ARP isteğini elle yazıp <code>pcap_sendpacket</code> ile gönderir.</p>
<div class="table-wrap"><table>
<tr><th>Bayt</th><th>Alan</th><th>Değer</th></tr>
<tr><td>0–5</td><td>Hedef MAC</td><td>ff:ff:ff:ff:ff:ff (yayın)</td></tr>
<tr><td>6–11</td><td>Kaynak MAC</td><td>54:42:49:02:31:8c</td></tr>
<tr><td>12–13</td><td>EtherType</td><td>0x0806 (ARP)</td></tr>
<tr><td>14–15</td><td>Donanım tipi</td><td>0x0001 (Ethernet)</td></tr>
<tr><td>16–17</td><td>Protokol tipi</td><td>0x0800 (IPv4)</td></tr>
<tr><td>18 · 19</td><td>Uzunluklar</td><td>6 · 4</td></tr>
<tr><td>20–21</td><td>Opcode</td><td>0x0001 (istek)</td></tr>
<tr><td>22–27</td><td>Gönderen MAC</td><td>54:42:49:02:31:8c</td></tr>
<tr><td>28–31</td><td>Gönderen IP</td><td>0a.09.1b.e1 = 10.9.27.225</td></tr>
<tr><td>32–37</td><td>Hedef MAC</td><td>00:00:00:00:00:00 (bilinmiyor)</td></tr>
<tr><td>38–41</td><td>Hedef IP</td><td>0a.09.1b.64 = 10.9.27.100</td></tr>
</table></div>
<div class="box tip">Akış: <code>pcap_lookupdev</code> → <code>pcap_open_live(dev, 100, 1, 1000, errbuf)</code> → diziyi doldur → <code>pcap_sendpacket(fp, packet, 42)</code>. Hex → IP çevirisi: 0x0a = 10, 0x09 = 9, 0x1b = 27, 0xe1 = 225.</div>
`
},
{
  id: 3,
  title: "Katman 3 Protokolleri (IP ve ICMP)",
  short: "IPv4 başlığı, fragmantasyon ve offset hesabı, seçenekler (source route, record route, timestamp), kontrol toplamı, IPv6, ICMP mesajları, ICMP ve ping C kodları.",
  principle: "IP bağlantısız ve en iyi çaba (best-effort) ile çalışır; hataları ve sorguları ICMP taşır.",
  body: `
<h2>1. IP protokolü</h2>
<p>TCP/IP'nin ağ katmanı iletim mekanizması. Paketlere <b>datagram</b> denir. Özellikler: <b>bağlantısız</b>, <b>en iyi çaba</b> (güvenilir değil, hata/akış kontrolü yok), <b>ortamdan bağımsız</b>, kapsülleme yapar. Başlık <b>20–60 bayt</b>.</p>

<h2>2. IPv4 başlığı</h2>
<div class="table-wrap"><table>
<tr><th>Alan</th><th>Bit</th><th>Açıklama</th></tr>
<tr><td>VER</td><td>4</td><td>Sürüm: 4</td></tr>
<tr><td>HLEN</td><td>4</td><td>Başlık uzunluğu, <b>4 baytlık birimle</b> (5 → 20 bayt, 15 → 60 bayt)</td></tr>
<tr><td>Servis tipi (DS)</td><td>8</td><td>Öncelik / farklılaştırılmış hizmet</td></tr>
<tr><td>Toplam uzunluk</td><td>16</td><td>Başlık + veri, bayt (en çok 65.535)</td></tr>
<tr><td>Kimlik (identification)</td><td>16</td><td>Aynı datagramın parçaları aynı kimliği taşır</td></tr>
<tr><td>Bayraklar</td><td>3</td><td>Ayrılmış · <b>D</b> (parçalama yapma) · <b>M</b> (daha parça var)</td></tr>
<tr><td>Parça ofseti</td><td>13</td><td>Parçanın orijinal veri içindeki yeri, <b>8 baytlık birimle</b></td></tr>
<tr><td>TTL</td><td>8</td><td>Her yönlendiricide 1 azalır; 0 olunca atılır, ICMP zaman aşımı gönderilir</td></tr>
<tr><td>Protokol</td><td>8</td><td><b>1 ICMP · 2 IGMP · 6 TCP · 17 UDP</b></td></tr>
<tr><td>Başlık kontrol toplamı</td><td>16</td><td>Yalnızca başlığı korur</td></tr>
<tr><td>Kaynak IP · Hedef IP</td><td>32 · 32</td><td></td></tr>
<tr><td>Seçenekler</td><td>0–320</td><td>En çok 40 bayt</td></tr>
</table></div>

<h2>3. Fragmantasyon</h2>
<p>Datagram, geçtiği her ağın <b>MTU</b>'suna (Ethernet 1500) sığmalıdır. Yönlendirici datagramı çerçeveden çıkarır, işler, gerekirse parçalayıp yeni çerçeveye koyar. <b>Birleştirme yalnızca hedefte yapılır.</b></p>
<div class="formula">ofset = (parçanın ilk veri baytı) ÷ 8
M = 1 → arkasından parça var,  M = 0 → son parça (ya da parçalanmamış)
D = 1 iken parçalama gerekiyorsa datagram atılır, ICMP hata mesajı gönderilir</div>
<details class="example" open><summary>Örnek: 4000 baytlık veri, kimlik 14.567</summary><div class="inner">
<div class="table-wrap"><table>
<tr><th>Parça</th><th>Veri baytları</th><th>Toplam uzunluk</th><th>M</th><th>Ofset</th></tr>
<tr><td>Orijinal</td><td>0000–3999</td><td>4020</td><td>0</td><td>0</td></tr>
<tr><td>1</td><td>0000–1399</td><td>1420</td><td>1</td><td>0</td></tr>
<tr><td>2</td><td>1400–2799</td><td>1420</td><td>1</td><td>1400/8 = 175</td></tr>
<tr><td>3</td><td>2800–3999</td><td>1220</td><td>0</td><td>2800/8 = 350</td></tr>
<tr><td>2.1 (2. parça yeniden bölünürse)</td><td>1400–2199</td><td>820</td><td>1</td><td>175</td></tr>
<tr><td>2.2</td><td>2200–2799</td><td>620</td><td>1</td><td>2200/8 = 275</td></tr>
</table></div>
<p>Toplam uzunluk = 20 baytlık başlık + veri. Hepsi kimlik 14.567'yi taşır. Parça 2'nin alt parçaları M = 1 kalır çünkü arkalarından parça 3 gelir.</p>
</div></details>

<h2>4. Seçenekler</h2>
<div class="formula">Tip (8 bit) = Copy (1) | Class (2) | Number (5)    Uzunluk (8)    Değer (değişken)
Copy: 0 yalnız ilk parçaya, 1 tüm parçalara kopyala
Class: 00 datagram kontrolü, 10 hata ayıklama ve yönetim</div>
<div class="table-wrap"><table>
<tr><th>Number</th><th>Seçenek</th><th>İşlevi</th></tr>
<tr><td>00000</td><td>End of option</td><td>Seçeneklerin sonu (dolgu)</td></tr>
<tr><td>00001</td><td>No operation</td><td>Hizalama için</td></tr>
<tr><td>00111</td><td>Record route</td><td>Geçilen yönlendiricilerin adresleri kaydedilir (en çok 9)</td></tr>
<tr><td>01001</td><td>Strict source route</td><td>Kaynak yolu kesin belirler; listedeki her yönlendiriciden ve yalnız onlardan geçilir</td></tr>
<tr><td>00011</td><td>Loose source route</td><td>Listedekilerden geçilir ama arada başka yönlendiriciler de olabilir</td></tr>
<tr><td>00100</td><td>Timestamp</td><td>Yönlendiricinin işlem zamanı (gece yarısından beri ms) kaydedilir</td></tr>
</table></div>
<p>Seçenekler zorunlu değildir; ağ testi ve hata ayıklamada kullanılır. Değişken kısım en çok <b>40 bayt</b>.</p>

<h2>5. Başlık kontrol toplamı</h2>
<p>Gönderen: başlığı 16 bitlik kelimelere böl, kontrol toplamı alanını 0 kabul et, <b>bire tümleyen</b> toplama yap (taşan bit sona eklenir), sonucun <b>tümleyenini</b> alana yaz. Alıcı: aynı toplamayı kontrol toplamıyla birlikte yapar; sonuç tümlenince <b>0</b> çıkmalı, değilse datagram atılır.</p>
<details class="example" open><summary>Örnek: TTL 4, protokol 17, toplam uzunluk 28, kimlik 1, 10.12.14.5 → 12.6.7.9</summary><div class="inner">
<div class="formula">4500   (VER 4, HLEN 5, TOS 0)
001C   (toplam uzunluk 28)
0001   (kimlik 1)
0000   (bayraklar + ofset)
0411   (TTL 4, protokol 17)
0000   (kontrol toplamı başta 0)
0A0C 0E05   (10.12.14.5)
0C06 0709   (12.6.7.9)
-----
Toplam   = 744E
Tümleyen = 8BB1  → kontrol toplamı</div></div></details>

<h2>6. IP modülleri (sözde kod)</h2>
<ul>
<li><b>Ekleme:</b> veriyi datagrama koy, kontrol toplamını hesapla, kuyruğa ekle.</li>
<li><b>İşleme:</b> hedef yerelse birleştirmeye gönder; yönlendiriciyse TTL'i azalt, TTL ≤ 0 ise at ve ICMP gönder; değilse iletim modülüne ver.</li>
<li><b>Parçalama:</b> boyut > MTU ise: D = 1 ise at + ICMP; değilse parçala, her parçaya başlık ve gereken seçenekleri ekle.</li>
<li><b>Birleştirme:</b> ofset = 0 ve M = 0 ise doğrudan teslim; değilse parçaları listede biriktir, hepsi gelince birleştirip üst katmana ver.</li>
</ul>

<h2>7. IPv6</h2>
<p><b>128 bit</b> adres (IPv4 ~4 milyar, IPv6 ~340 undesilyon = 3,4 × 10³⁸) · geliştirilmiş paket işleme (sabit 40 baytlık temel başlık, uzantı başlıkları) · <b>NAT ihtiyacını ortadan kaldırır</b> · entegre güvenlik (IPsec).</p>

<h2>8. ICMP</h2>
<p>IP'nin hata bildirme ve sorgu eksikliğini kapatır; mesajlar IP datagramı içinde taşınır (protokol = 1). İki amaç: <b>hata raporlama</b> ve <b>sorgu</b> (çiftler hâlinde istek–cevap).</p>
<div class="formula">ICMP başlığı: Tip (8) | Kod (8) | Kontrol toplamı (16) | Başlığın geri kalanı (32) | Veri</div>
<div class="table-wrap"><table>
<tr><th>Tip</th><th>Mesaj</th><th>Not</th></tr>
<tr><td>3</td><td>Hedef ulaşılamaz</td><td>Kod 2 (protokol) ve 3 (port) yalnızca hedef hosttan; diğer kodlar yönlendiricilerden</td></tr>
<tr><td>4</td><td>Kaynak söndürme (source quench)</td><td>Tıkanıklık yüzünden atılan her datagram için; kaynak yavaşlamalı (IP'de akış/tıkanıklık kontrolü yok)</td></tr>
<tr><td>11</td><td>Zaman aşımı</td><td><b>Kod 0</b>: TTL 0 oldu (yönlendirici) · <b>Kod 1</b>: tüm parçalar süresinde gelmedi (hedef host)</td></tr>
<tr><td>12</td><td>Parametre problemi</td><td>Başlıkta belirsizlik ya da eksik; yönlendirici ya da hedef üretir</td></tr>
<tr><td>5</td><td>Yeniden yönlendirme (redirect)</td><td>Yönlendiriciden aynı ağdaki hosta; hostun küçük yönlendirme tablosunu günceller</td></tr>
<tr><td><b>8 / 0</b></td><td>Echo istek / echo cevap</td><td>ping ve traceroute; ulaşılabilirlik testi</td></tr>
<tr><td>13 / 14</td><td>Zaman damgası istek / cevap</td><td>Gidiş-dönüş süresi ve saat eşitleme</td></tr>
</table></div>
<p>ICMP paketi iki modülden oluşur: <b>giriş modülü</b> (istekse cevap üret, redirect ise tabloyu güncelle, diğer hatalarda ilgili protokolü bilgilendir) ve <b>çıkış modülü</b> (hata ya da istek mesajı üretip gönder).</p>

<h2>9. Kod: icmpgonder.c (50 bayt)</h2>
<div class="table-wrap"><table>
<tr><th>Bayt</th><th>Alan</th><th>Değer</th></tr>
<tr><td>0–5 · 6–11</td><td>Hedef · kaynak MAC</td><td>00:50:56:fc:18:27 · 00:0c:29:cd:27:50</td></tr>
<tr><td>12–13</td><td>EtherType</td><td>0x0800 (IPv4)</td></tr>
<tr><td>14</td><td>VER + HLEN</td><td>0x45 → IPv4, 5×4 = 20 bayt</td></tr>
<tr><td>15</td><td>Servis tipi</td><td>0x00</td></tr>
<tr><td>16–17</td><td>Toplam uzunluk</td><td>0x0024 = 36 (20 IP + 16 ICMP)</td></tr>
<tr><td>18–19</td><td>Kimlik</td><td>0x10fd</td></tr>
<tr><td>20–21</td><td>Bayraklar + ofset</td><td>0x0000 (parçalanmamış)</td></tr>
<tr><td>22</td><td>TTL</td><td>0x40 = 64</td></tr>
<tr><td>23</td><td>Protokol</td><td>0x01 = ICMP</td></tr>
<tr><td>24–25</td><td>Başlık kontrol toplamı</td><td>0x0000 (kodda hesaplanmamış)</td></tr>
<tr><td>26–29 · 30–33</td><td>Kaynak · hedef IP</td><td>192.168.11.128 · 216.58.206.196</td></tr>
<tr><td>34 · 35</td><td>ICMP tip · kod</td><td><b>8 · 0</b> (echo istek)</td></tr>
<tr><td>36–37</td><td>ICMP kontrol toplamı</td><td>0x0000</td></tr>
<tr><td>38–41</td><td>Tanımlayıcı · sıra no</td><td>0x118d · 0x001b</td></tr>
<tr><td>42–49</td><td>Veri (zaman damgası)</td><td>8 bayt</td></tr>
</table></div>
<p>14 Ethernet + 20 IP + 16 ICMP = <b>50 bayt</b>. Kontrol toplamları 0 bırakıldığı için gerçek bir hedef bu paketi reddedebilir; sınavda alanların yerini ve anlamını bilmek önemli.</p>

<h2>10. Kod: ping uygulaması (pcap ile)</h2>
<div class="table-wrap"><table>
<tr><th></th><th>ping_client.c</th><th>ping_server.c</th></tr>
<tr><td>Kullanım</td><td><code>./ping_client &lt;adres&gt; -c &lt;sayı&gt;</code> (argc = 4)</td><td>Çalıştırılır, sürekli dinler</td></tr>
<tr><td>Filtre</td><td><code>"icmp && dst " + kendi IP</code> → yalnızca kendisine gelen ICMP</td><td>Aynı filtre</td></tr>
<tr><td>İşleyiş</td><td>Echo isteği paketini oluşturur, <code>pcap_sendpacket</code> ile yollar, <code>clock()</code> ile zamanı başlatır, <code>pcap_loop(fp, 1, …)</code> ile tek cevabı bekleyip süreyi ölçer; sayı kadar tekrarlar</td><td><code>pcap_loop</code> ile yakalar; echo isteği gelirse paketi kopyalar, <b>MAC adreslerini ve IP adreslerini yer değiştirir</b> (swap), 34. baytı (tip) <b>0 = echo cevap</b> yapıp gönderir</td></tr>
</table></div>
<div class="box warn"><span class="label">Kodda dikkat</span>Sunucu isteği <code>packet[34] == 0x08 && packet[35] == 0x08</code> ile tanıyor. 34. bayt tip (8 = istek) doğru; 35. bayt <b>kod</b> alanıdır ve echo isteğinde 0'dır. Bu koşul, istemcinin gönderdiği pakete göre ayarlanmış; standart pakette 35. bayt 0 olmalıdır.</div>
`
},
{
  id: 4,
  title: "Katman 4 Protokolleri (TCP ve UDP)",
  short: "TCP özellikleri ve başlığı, sıra/onay numarası, 3 yollu el sıkışma, bağlantı sonlandırma, pencereler, ARQ, RTO hesabı, tıkanıklık kontrolü, zamanlayıcılar, UDP.",
  principle: "TCP bağlantı yönelimli ve güvenilirdir (sıra, onay, yeniden iletim); UDP bağlantısız, hızlı ve güvenilir değildir.",
  body: `
<h2>1. TCP genel özellikleri</h2>
<ul>
<li><b>Bağlantı yönelimli ve güvenilir</b>; kaynak ile hedef arasında sanal bir yol kurar, mesajın tüm segmentleri bu yoldan gider.</li>
<li>Hata kontrolü, akış kontrolü, tıkanıklık kontrolü. Veri birimine <b>segment</b> denir. Bayt akışı (stream) servisi, tam çift yönlü (full-duplex).</li>
<li>Bağlantıda aktarılan her <b>bayt numaralanır</b>; numaralama rastgele bir başlangıç sayısıyla (ISN) başlar.</li>
<li><b>Sıra numarası</b> = segmentteki <b>ilk veri baytının</b> numarası.</li>
<li><b>Onay numarası</b> = alıcının <b>beklediği bir sonraki bayt</b>; <b>kümülatiftir</b>.</li>
</ul>
<div class="formula">Kapsülleme:  Çerçeve başlığı | IP başlığı | TCP başlığı | uygulama verisi</div>

<h2>2. TCP başlığı (20–60 bayt)</h2>
<div class="table-wrap"><table>
<tr><th>Alan</th><th>Bit</th><th>Açıklama</th></tr>
<tr><td>Kaynak port · Hedef port</td><td>16 · 16</td><td></td></tr>
<tr><td>Sıra numarası</td><td>32</td><td>İlk veri baytının numarası</td></tr>
<tr><td>Onay numarası</td><td>32</td><td>Beklenen sonraki bayt</td></tr>
<tr><td>HLEN</td><td>4</td><td>4 baytlık birimle (5–15 → 20–60 bayt)</td></tr>
<tr><td>Ayrılmış</td><td>6</td><td></td></tr>
<tr><td>Bayraklar</td><td>6</td><td><b>URG · ACK · PSH · RST · SYN · FIN</b></td></tr>
<tr><td>Pencere (rwnd)</td><td>16</td><td>Alıcının kabul edebileceği bayt</td></tr>
<tr><td>Kontrol toplamı</td><td>16</td><td>Sözde başlık + başlık + veri; TCP'de zorunlu</td></tr>
<tr><td>Acil göstergesi</td><td>16</td><td>URG = 1 ise geçerli</td></tr>
<tr><td>Seçenekler</td><td>0–320</td><td>En çok 40 bayt (MSS, pencere ölçeği, zaman damgası, SACK)</td></tr>
</table></div>

<h2>3. Bağlantı kurma: 3 yollu el sıkışma</h2>
<details class="example" open><summary>Sunumdaki örnek</summary><div class="inner">
<div class="formula">1) İstemci → Sunucu   SYN            seq = 8000
2) Sunucu  → İstemci  SYN + ACK      seq = 15000, ack = 8001, rwnd = 5000
3) İstemci → Sunucu   ACK            seq = 8000*, ack = 15001, rwnd = 10000
   * veri taşımayan ACK sıra numarası tüketmez; veri taşırsa (piggybacking) seq = 8001</div>
<p><b>SYN ve FIN veri taşımasa da 1 sıra numarası tüketir.</b> Saf ACK sıra numarası tüketmez. Bu yüzden ilk veri baytının numarası 8001'dir.</p>
</div></details>
<p><b>SYN taşkını (SYN flooding):</b> sahte adreslerden çok sayıda SYN gönderilip sunucunun kaynakları tüketilir (hizmet reddi).</p>

<h2>4. Veri aktarımı ve sonlandırma</h2>
<p>Veri segmentleri sıra numarasıyla gider; onaylar veriye bindirilebilir (piggybacking). <b>PSH</b> verinin beklemeden iletilmesini, <b>URG</b> acil veriyi belirtir.</p>
<div class="formula">Üç yollu sonlandırma:  FIN →  FIN + ACK ←  ACK →
Yarım kapatma (half-close): bir taraf FIN gönderir, karşı taraf hâlâ veri gönderebilir (dört adım: FIN, ACK, …veri…, FIN, ACK)</div>
<p><b>Bağlantı reddi:</b> kapalı porta gelen SYN'e <b>RST</b> ile cevap. <b>Bağlantı iptali:</b> anormal durumda RST gönderilir, kuyruktaki veri atılır.</p>
<p>TCP bağlantısı bir <b>durum geçiş şemasıyla</b> izlenir: CLOSED, LISTEN, SYN-SENT, SYN-RCVD, ESTABLISHED, FIN-WAIT-1/2, CLOSE-WAIT, LAST-ACK, CLOSING, <b>TIME-WAIT</b>.</p>

<h2>5. Pencereler ve akış kontrolü</h2>
<p>TCP her yön için <b>gönderme</b> ve <b>alma</b> penceresi kullanır: çift yönlü iletişimde <b>4 pencere</b>. Akış kontrolü, üreticinin hızını tüketicinin hızına dengeler; alıcı <b>rwnd</b> değerini bildirir. TCP akış kontrolünü hata kontrolünden ayırır.</p>
<div class="formula">gönderme penceresi = min(rwnd, cwnd)
rwnd = alıcı tampon boyutu − alınmış ama henüz uygulamaya verilmemiş bayt</div>

<h2>6. Hata kontrolü</h2>
<p>Üç araç: <b>kontrol toplamı</b>, <b>onay</b>, <b>zaman aşımı</b>. Kayıp/bozuk paketi sezip yeniden ileten yöntemlere <b>ARQ</b> (Automatic Repeat reQuest) denir.</p>
<div class="table-wrap"><table>
<tr><th>ARQ</th><th>Kayıpta ne olur?</th></tr>
<tr><td>Stop-and-Wait</td><td>Her paketten sonra onay beklenir; pencere 1</td></tr>
<tr><td>Go-Back-N</td><td>Kayıp paket ve ondan sonra gönderilenlerin hepsi yeniden gönderilir (2 kayıpsa 2, 3, 4, 5 tekrar)</td></tr>
<tr><td>Selective Repeat</td><td>Yalnızca kaybolan paket yeniden gönderilir; alıcı sırasız gelenleri tamponlar</td></tr>
</table></div>
<p><b>Hızlı yeniden iletim:</b> aynı onaydan <b>3 kopya (duplicate) ACK</b> gelirse zaman aşımı beklenmeden kayıp segment yeniden gönderilir. Kayıp ACK, sonraki kümülatif ACK ile telafi edilir.</p>

<h2>7. Zamanlayıcılar</h2>
<div class="table-wrap"><table>
<tr><th>Zamanlayıcı</th><th>Görevi</th></tr>
<tr><td><b>Yeniden iletim (RTO)</b></td><td>Süresi dolarsa onaylanmamış ilk segment yeniden gönderilir. Başlatma: veri segmenti gönderilince, yeni veriyi onaylayan ACK gelince, yeniden iletimde. Tüm segmentler onaylanınca durur. Adaptif olmalı (küçükse gereksiz tekrar, büyükse uzun bekleme)</td></tr>
<tr><td><b>Kalıcılık (persistence)</b></td><td>Sıfır pencere kilitlenmesini önler; rwnd = 0 gelince başlar, dolunca 1 baytlık <b>prob</b> segmenti gönderilir</td></tr>
<tr><td><b>Canlı tutma (keep-alive)</b></td><td>Uzun süre sessiz bağlantı için; genelde <b>2 saat</b>, sonra <b>75 s arayla 10 prob</b>; cevap yoksa bağlantı sonlandırılır</td></tr>
<tr><td><b>TIME-WAIT</b></td><td>Son ACK'ten sonra başlar (2 MSL); ağda kalan eski datagramların yeni açılan bağlantıya karışmasını önler</td></tr>
</table></div>
<h3>RTO hesabı</h3>
<div class="formula">İlk ölçüm:  RTTs = RTTm,   RTTd = RTTm / 2
Sonra:      RTTs = (1 − α)·RTTs + α·RTTm        α = 1/8
            RTTd = (1 − β)·RTTd + β·|RTTs − RTTm|   β = 1/4
            RTO  = RTTs + 4·RTTd                 (ölçüm yokken RTO = 6 s)</div>
<details class="example" open><summary>Sunumdaki örnek</summary><div class="inner">
<p>SYN gönderilir: değer yok, <b>RTO = 6 s</b>. SYN + ACK gelir, RTTm = 1,5 s → RTTs = 1,5, RTTd = 0,75, <b>RTO = 1,5 + 3 = 4,5 s</b>.</p>
<p>Sonraki ölçüm RTTm = 2,5 s → RTTs = 0,875·1,5 + 0,125·2,5 = 1,625 · RTTd = 0,75·0,75 + 0,25·|1,625 − 2,5| = 0,78125 · <b>RTO = 1,625 + 4·0,78125 = 4,75 s</b>.</p>
<p>Birden çok segment beklenirken yalnızca bir ölçüm yapılır; kümülatif ACK ilk segmentin RTTm'ini kesinleştirir. Yeniden iletilen segment için RTT ölçülmez (Karn algoritması).</p>
</div></details>

<h2>8. Tıkanıklık kontrolü</h2>
<p>Açık döngü (önleme) ve kapalı döngü (sezip hafifletme) mekanizmaları; tıkanıklık penceresi <b>cwnd</b> ve eşik <b>ssthresh</b>.</p>
<div class="table-wrap"><table>
<tr><th>Aşama</th><th>cwnd davranışı</th></tr>
<tr><td><b>Yavaş başlatma</b> (slow start)</td><td>1 MSS'ten başlar, her ACK'te +1 → her RTT'de <b>ikiye katlanır (üstel)</b>, ssthresh'e kadar</td></tr>
<tr><td><b>Tıkanıklıktan kaçınma</b></td><td>ssthresh'ten sonra her RTT'de <b>+1 MSS (doğrusal / toplamsal artış)</b></td></tr>
<tr><td>Zaman aşımı</td><td>ssthresh = cwnd / 2, cwnd = 1 → yavaş başlatmaya dön</td></tr>
<tr><td>3 kopya ACK</td><td>Tahoe: cwnd = 1 · Reno: ssthresh = cwnd / 2, cwnd = ssthresh (+3), <b>hızlı kurtarma</b></td></tr>
</table></div>
<p>Sürümler: <b>Tahoe</b> (1988): yavaş başlatma, tıkanıklıktan kaçınma, hızlı yeniden iletim · <b>Reno</b> (1990): + hızlı kurtarma · <b>New Reno</b> (1996) · <b>SACK</b> (1996).</p>
<p>Her bağlantının bilgileri <b>İletim Kontrol Bloğu (TCB)</b> içinde tutulur: durum, portlar, IP'ler, pencere, sıra numaraları, zamanlayıcılar, tampon göstergeleri.</p>

<h2>9. UDP</h2>
<ul>
<li><b>Bağlantısız, güvenilir olmayan</b> taşıma protokolü; veri birimi <b>kullanıcı datagramı</b>.</li>
<li>Akış kontrolü ve onay mekanizması <b>yok</b>; hata kontrolü sınırlı: kontrol toplamı hatalıysa paket <b>sessizce atılır</b>.</li>
<li>Yaptıkları: kapsülleme/kapsül açma · kuyruklama (port başına giriş/çıkış kuyruğu) · <b>çoğullama / ayrıştırma</b> (multiplexing / demultiplexing, port numarasıyla).</li>
<li>Gecikmeye tahammülü olmayan gerçek zamanlı uygulamalar (multimedya akışı), DNS, DHCP, SNMP için uygundur.</li>
</ul>
<div class="formula">UDP başlığı (8 bayt sabit):  Kaynak port (16) | Hedef port (16) | Toplam uzunluk (16) | Kontrol toplamı (16)
Toplam uzunluk = 8 + veri.  IPv4'te kontrol toplamı isteğe bağlıdır (0 = hesaplanmadı)</div>
<div class="table-wrap"><table>
<tr><th></th><th>TCP</th><th>UDP</th></tr>
<tr><td>Bağlantı</td><td>Var (3 yollu el sıkışma)</td><td>Yok</td></tr>
<tr><td>Güvenilirlik</td><td>Sıra, onay, yeniden iletim</td><td>Yok</td></tr>
<tr><td>Akış / tıkanıklık kontrolü</td><td>Var</td><td>Yok</td></tr>
<tr><td>Başlık</td><td>20–60 bayt</td><td>8 bayt</td></tr>
<tr><td>Veri birimi</td><td>Segment (bayt akışı)</td><td>Kullanıcı datagramı (mesaj sınırları korunur)</td></tr>
<tr><td>Kullanım</td><td>HTTP, FTP, SMTP, SSH</td><td>DNS, DHCP, VoIP, video akışı</td></tr>
</table></div>
`
},
{
  id: 5,
  title: "Soket Programlama",
  short: "Soket kavramı ve türleri, istemci–sunucu, socket/bind/listen/connect/accept/send/recv/sendto/recvfrom/close, TCP ve UDP akışı, Java soket sınıfları, veri kodlama, bayt sırası.",
  principle: "Soket = IP adresi + taşıma protokolü + port; sunucu pasif dinler, istemci aktif bağlanır.",
  body: `
<h2>1. Soket kavramı</h2>
<p>Soketler TCP ya da UDP kullanan iki bilgisayar arasındaki genel iletişim mekanizmasıdır; ağ programlamanın <b>standart API</b>'sidir. Bir soket üç şeyle tanımlanır: <b>IP adresi · taşıma katmanı protokolü · port numarası</b>.</p>
<div class="table-wrap"><table>
<tr><th>Tür</th><th>Temel</th><th>Sabit</th></tr>
<tr><td><b>Akış (stream) soketi</b></td><td>TCP: güvenilir, çift yönlü, bağlantılı</td><td>SOCK_STREAM</td></tr>
<tr><td><b>Datagram soketi</b></td><td>UDP: güvenilmez, bağlantısız, mesaj sınırlı</td><td>SOCK_DGRAM</td></tr>
<tr><td><b>Ham (raw) soket</b></td><td>Ham paket yapısı; IP/ICMP başlıklarını programcı kurar</td><td>SOCK_RAW</td></tr>
</table></div>
<h3>İstemci–sunucu</h3>
<p><b>Sunucu:</b> pasif bekler, istemcilere cevap verir → <b>pasif soket</b>. <b>İstemci:</b> bağlantıyı başlatır, sunucunun IP ve portunu bilmelidir → <b>aktif soket</b>.</p>

<h2>2. Soket fonksiyonları</h2>
<div class="table-wrap"><table>
<tr><th>Fonksiyon</th><th>Görevi</th><th>Dönüş</th></tr>
<tr><td><code>socket(family, type, protocol)</code></td><td>Uç noktada soket oluşturur</td><td>Soket tanımlayıcısı (sockid), hatada −1</td></tr>
<tr><td><code>bind(sockid, &addrport, size)</code></td><td>Yerel IP ve portu sokete bağlar</td><td>0 / −1</td></tr>
<tr><td><code>listen(sockid, queuelen)</code></td><td>Bağlantıları pasif dinler (TCP sunucusu)</td><td>0 / −1</td></tr>
<tr><td><code>connect(sockid, &foreignAddr, addrlen)</code></td><td>Başka sokete bağlantı başlatır (TCP istemcisi)</td><td>0 başarılı, −1 hata</td></tr>
<tr><td><code>accept(sockid, &clientAddr, &addrlen)</code></td><td>Yeni bağlantıyı kabul eder; <b>yeni bir soket</b> döndürür</td><td>Yeni soket / −1</td></tr>
<tr><td><code>send/write</code> · <code>recv/read</code></td><td>Akış soketinde veri yazar / okur</td><td>Bayt sayısı / −1</td></tr>
<tr><td><code>sendto</code> · <code>recvfrom</code></td><td>UDP soketinde datagram gönderir / alır (adres her çağrıda)</td><td>Bayt sayısı / −1</td></tr>
<tr><td><code>close(sockid)</code></td><td>Soketi kapatır; akışta bağlantı sonlanır, port serbest kalır</td><td>0 / −1</td></tr>
</table></div>
<h3>socket() parametreleri</h3>
<ul>
<li><b>family:</b> <code>PF_INET</code> (IPv4, en yaygın) · <code>PF_UNIX</code> (yerel, dosya adresleri)</li>
<li><b>type:</b> <code>SOCK_STREAM</code> (güvenilir, çift yönlü, bağlantılı) · <code>SOCK_DGRAM</code> (güvenilmez, bağlantısız, sınırlı uzunlukta mesaj)</li>
<li><b>protocol:</b> <code>IPPROTO_TCP</code> · <code>IPPROTO_UDP</code> · genelde <b>0</b> (varsayılan protokol)</li>
</ul>
<h3>Adres yapıları</h3>
<div class="formula">struct sockaddr     { u_short sa_family;  char sa_data[14]; };      // genel adres tipi
struct sockaddr_in  { short sin_family;    // AF_INET
                      u_short sin_port;    // 16 bit port (ağ bayt sırası)
                      struct in_addr sin_addr;  // 32 bit IP
                      char sin_zero[8]; };  // dolgu
sockaddr_in, sockaddr'a dönüştürülerek (cast) fonksiyonlara verilir</div>
<p>Sunucuda IP genellikle <code>INADDR_ANY</code> yapılır: herhangi bir gelen arayüzden bağlantı kabul edilir.</p>
<div class="box key"><span class="label">bind() ne zaman atlanabilir?</span><b>Datagram:</b> yalnızca gönderiyorsa bind gerekmez (işletim sistemi her gönderimde port seçer); <b>alıyorsa gerekir</b>. <b>Akış (istemci):</b> hedef bağlantı kurulurken belirlenir; istemci portunu bilmeye gerek yoktur, sunucu bağlantı kurulurken öğrenir.</div>
<div class="box warn"><span class="label">Dinleme soketi</span>listen() yapılan soket <b>hiçbir zaman veri gönderip almak için kullanılmaz</b>; yalnızca yeni bağlantıları almaya yarar. Veri, accept()'in döndürdüğü yeni soketle gönderilir. queuelen, bekleyen bağlantı sayısıdır.</div>

<h2>3. TCP istemci–sunucu akışı</h2>
<div class="table-wrap"><table>
<tr><th>İstemci</th><th>Sunucu</th></tr>
<tr><td>1. TCP soketi oluştur — <code>socket()</code></td><td>1. TCP soketi oluştur — <code>socket()</code></td></tr>
<tr><td>2. Bağlantı kur — <code>connect()</code></td><td>2. Sokete port ata — <code>bind()</code></td></tr>
<tr><td>3. İletişim — <code>send()/recv()</code></td><td>3. Soketi dinle — <code>listen()</code></td></tr>
<tr><td>4. Kapat — <code>close()</code></td><td>4. Döngü: a) <code>accept()</code> b) <code>recv()/send()</code> c) <code>close()</code></td></tr>
</table></div>
<p>connect() çağrıldığında sunucunun bloklanmış accept()'i açılır ve istemcinin soket adresi döner. connect() TCP'nin 3 yollu el sıkışmasını başlatır.</p>

<h2>4. UDP istemci–sunucu akışı</h2>
<div class="table-wrap"><table>
<tr><th>İstemci</th><th>Sunucu</th></tr>
<tr><td>1. UDP soketi — <code>socket(PF_INET, SOCK_DGRAM, 0)</code></td><td>1. UDP soketi</td></tr>
<tr><td>2. (İsteğe bağlı) port ata</td><td>2. Port ata — <code>bind()</code></td></tr>
<tr><td>3. <code>sendto()/recvfrom()</code></td><td>3. Döngü: <code>recvfrom()</code> → <code>sendto()</code></td></tr>
<tr><td>4. <code>close()</code></td><td>(listen ve accept yok)</td></tr>
</table></div>

<h2>5. Java'da soketler</h2>
<p>Paketler: <code>java.net</code> (ServerSocket, Socket, DatagramSocket) ve <code>java.io</code> (bayt akışları: InputStream, OutputStream, DataInputStream…; karakter akışları: BufferedReader, PrintWriter, InputStreamReader…).</p>
<div class="table-wrap"><table>
<tr><th>Sınıf / metot</th><th>Görevi</th></tr>
<tr><td><code>ServerSocket(int port)</code></td><td>Porta bağlı sunucu soketi; port doluysa istisna</td></tr>
<tr><td><code>ServerSocket(port, backlog)</code> · <code>(port, backlog, InetAddress)</code></td><td>Bekleme kuyruğu boyutu · dinlenecek yerel IP</td></tr>
<tr><td><code>ServerSocket()</code> + <code>bind(SocketAddress, backlog)</code></td><td>Bağlanmamış soket, sonra bağlama</td></tr>
<tr><td><code>accept()</code></td><td>İstemci gelene kadar bekler, <b>Socket</b> döndürür</td></tr>
<tr><td><code>setSoTimeout(int)</code></td><td>accept() bekleme süresi</td></tr>
<tr><td><code>getLocalPort()</code></td><td>Dinlenen port (0 verildiyse sistemin seçtiği)</td></tr>
<tr><td><code>Socket(String host, int port)</code></td><td>İstemci: sunucuya bağlanır; istisna yoksa bağlantı başarılı</td></tr>
<tr><td><code>getInputStream()</code> · <code>getOutputStream()</code></td><td>Karşı soketin çıkışına / girişine bağlı akışlar</td></tr>
<tr><td><code>getInetAddress()</code> · <code>getPort()</code> · <code>getLocalPort()</code></td><td>Uzak adres · uzak port · yerel port</td></tr>
<tr><td><code>DatagramSocket</code> + <code>DatagramPacket</code></td><td>UDP</td></tr>
</table></div>
<p>İstemci Socket nesnesini kendisi oluşturur, sunucu ise <code>accept()</code>'in dönüşüyle alır.</p>

<h2>6. Mesaj oluşturma ve bayt sırası</h2>
<p>İki tamsayıyı (x, y) göndermek için:</p>
<ul>
<li><b>1. çözüm — karakter kodlama (ASCII):</b> ekranda gösterimle aynı, büyük sayılar mümkün. Sakıncaları: sayılar arasında <b>ayraç</b> gerekir, tampon yeterince büyük olmalı, <code>strlen</code> yalnızca mesaj baytlarını sayar, her rakam 1 bayt harcar (4 bit yeterdi), sayılarla işlem zahmetli.</li>
<li><b>2. çözüm — değerleri ikili göndermek:</b> bir protokol belirlenir: her tamsayı kaç bit, hangi kodlama (2'ye tümleyen, işaretli/işaretsiz), hangi bayt sırası.</li>
</ul>
<div class="table-wrap"><table>
<tr><th>Bayt sırası</th><th>Anlamı</th></tr>
<tr><td>Little-endian</td><td>Düşük anlamlı bayt önce (Intel x86)</td></tr>
<tr><td>Big-endian</td><td>Yüksek anlamlı bayt önce</td></tr>
<tr><td>Host byte order</td><td>Makinenin kendi sırası</td></tr>
<tr><td><b>Network byte order</b></td><td>Ağın sırası — <b>her zaman big-endian</b></td></tr>
</table></div>
<div class="formula">htons() / htonl()   host → network  (short 16 bit / long 32 bit)
ntohs() / ntohl()   network → host
Big-endian makinede bu fonksiyonlar hiçbir şey yapmaz; little-endian'da baytları ters çevirir.
Örnek: 0x1234 portu little-endian bellekte 34 12, ağda 12 34</div>
<details class="example"><summary>Örnek: TCP sunucu iskeleti (C)</summary><div class="inner">
<div class="formula">int s = socket(PF_INET, SOCK_STREAM, 0);
struct sockaddr_in a;  a.sin_family = AF_INET;
a.sin_port = htons(5000);  a.sin_addr.s_addr = htonl(INADDR_ANY);
bind(s, (struct sockaddr *)&a, sizeof(a));
listen(s, 5);
for (;;) {
  int c = accept(s, NULL, NULL);       // yeni soket
  int n = recv(c, buf, sizeof(buf), 0);
  send(c, buf, n, 0);                  // yankı (echo)
  close(c);
}</div></div></details>
`
}
];
