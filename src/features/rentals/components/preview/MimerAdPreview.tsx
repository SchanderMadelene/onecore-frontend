import placeholderImg from "@/assets/preview-housing-placeholder.jpg";
import type { EditHousingFormData } from "@/features/rentals/components/edit-housing/types";
import type { HousingSpace } from "@/features/rentals/components/types/housing";

interface MimerAdPreviewProps {
  housing: HousingSpace;
  form: Partial<EditHousingFormData>;
}

const formatDate = (d?: Date | string) => {
  if (!d) return "0000-00-00";
  const date = typeof d === "string" ? new Date(d) : d;
  if (isNaN(date.getTime())) return "0000-00-00";
  return date.toISOString().slice(0, 10);
};

export const MimerAdPreview = ({ housing, form }: MimerAdPreviewProps) => {
  const heading = form.mainHeading?.trim() || housing.address;
  const features: string[] = [];
  if (form.tvViaFiber) features.push("Internetuppkoppling via Fibra");
  features.unshift("Kabel-TV via Koaxialkabel");
  if (form.individualKitchenMeasurement) features.push("Individuell mätning av hushållsel");
  if (form.dishwasher) features.push("Diskmaskin");
  if (form.frontLoadingWasher) features.push("Frontmatad tvättmaskin");
  if (form.tumbleDryer) features.push("Torktumlare");
  if (form.microwave) features.push("Mikrovågsugn");
  if (form.combinedRefrigeratorFreezer) features.push("Kombinerat kyl/frys");
  if (form.handshower) features.push("Handdusch");
  if (form.pantry) features.push("Skafferi");
  if (form.smokeFreeHouse) features.push("Rökfritt hus");
  if (form.accessToCommonRoom) features.push("Tillgång till gemensamhetslokal");
  if (form.accessToOvernightRoom) features.push("Tillgång till övernattningsrum");
  if (form.individualWaterHeaterMeasurement) features.push("Individuell mätning av varmvatten");
  if (form.propertyOwnerPaidApartmentInsurance) features.push("Hemförsäkring betald av hyresvärd");
  features.push("Valfritt lägenhetsunderhåll, VLU");

  const additionalInfo = form.description?.trim() || form.webNote?.trim() || "";
  const sellingPoint = form.sellingPoint?.trim();
  const lastApplicationDate = formatDate(form.publishTo);

  return (
    <div className="bg-white font-sans text-[15px] leading-relaxed text-gray-900">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="mx-auto flex max-w-[1100px] items-center justify-between px-6 py-4">
          <div className="flex items-center gap-1">
            <span className="text-2xl font-bold text-gray-900">mimer</span>
            <span className="inline-flex h-5 w-7 items-center justify-center rounded bg-[#00a3a1] text-[10px] font-bold text-white">
              ▾m
            </span>
          </div>
          <nav className="hidden items-center gap-7 text-[14px] text-gray-800 md:flex">
            <a href="#" className="border-b-2 border-gray-900 pb-1 font-medium">Sök ledigt</a>
            <a href="#" className="hover:text-gray-600">Hyra och bo</a>
            <a href="#" className="hover:text-gray-600">Nyproduktion</a>
            <a href="#" className="hover:text-gray-600">Om Mimer</a>
            <a href="#" className="hover:text-gray-600">Kontakta oss</a>
            <a href="#" className="hover:text-gray-600">Mina Sidor</a>
            <span className="text-gray-500">🌐</span>
            <span className="text-gray-500">🔍</span>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-[1000px] px-6 pb-20 pt-10">
        <div className="mb-3">
          <a href="#" className="text-[14px] text-gray-700 underline-offset-2 hover:underline">
            ‹ Tillbaka till sökning
          </a>
          <div className="mt-3 h-px w-32 bg-gray-300" />
        </div>

        <div className="mb-4 flex items-start justify-between">
          <h1 className="text-[28px] font-bold uppercase tracking-tight text-[#00a3a1] md:text-[32px]">
            {heading.toUpperCase()}
          </h1>
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded bg-[#f5b800] text-2xl font-bold text-gray-900">
            E
          </div>
        </div>

        <div className="mb-10 grid grid-cols-1 gap-0 overflow-hidden md:grid-cols-[1fr_320px]">
          <img
            src={placeholderImg}
            alt={`Bild på ${heading}`}
            className="h-[340px] w-full object-cover"
          />
          <dl className="bg-[#ececec] px-6 py-6 text-[14px]">
            {[
              ["Adress", housing.address],
              ["Område", housing.area],
              ["Rum", `${housing.rooms} rum och kök`],
              ["Yta", housing.size],
              ["Hyra", housing.rent],
              ["Våning", housing.floor],
              ["Inflyttning", form.moveIn || "Omgående"],
              ["Typ", housing.type],
              ["Hiss", "Nej"],
              ["Byggnadsår", "1918"],
              ["Objektsnummer", housing.id],
            ].map(([label, value]) => (
              <div key={label} className="grid grid-cols-[110px_1fr] gap-3 py-[3px]">
                <dt className="text-right font-semibold text-gray-900">{label}</dt>
                <dd className="border-l border-gray-400 pl-3 text-gray-900">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <div>
            <section className="mb-10">
              <h2 className="mb-4 text-[15px] font-bold uppercase tracking-wide text-gray-900">
                Beskrivning
              </h2>
              <ul className="space-y-1 text-[14px]">
                {features.map((f) => (
                  <li key={f} className="flex gap-3">
                    <span className="mt-[7px] inline-block h-[6px] w-[6px] flex-shrink-0 bg-[#00a3a1]" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a href="#" className="mt-4 inline-block text-[14px] text-gray-900 underline">
                Läs mer om vad som gäller för lägenhetsunderhåll här.
              </a>
            </section>

            {sellingPoint && (
              <section className="mb-10">
                <h2 className="mb-3 text-[15px] font-bold uppercase tracking-wide text-gray-900">
                  I hyran ingår
                </h2>
                <ul className="space-y-1 text-[14px]">
                  <li className="flex gap-3">
                    <span className="mt-[7px] inline-block h-[6px] w-[6px] flex-shrink-0 bg-[#00a3a1]" />
                    <span>{sellingPoint}</span>
                  </li>
                </ul>
              </section>
            )}

            {additionalInfo && (
              <section className="mb-10">
                <h2 className="mb-3 text-[15px] font-bold uppercase tracking-wide text-gray-900">
                  Ytterligare information
                </h2>
                <p className="whitespace-pre-line text-[14px]">{additionalInfo}</p>
              </section>
            )}

            {form.parkingInfo && (
              <section className="mb-10">
                <h2 className="mb-3 text-[15px] font-bold uppercase tracking-wide text-gray-900">
                  Parkera bilen
                </h2>
                <p className="whitespace-pre-line text-[14px]">{form.parkingInfo}</p>
              </section>
            )}

            {form.visitorParkingInfo && (
              <section className="mb-10">
                <h2 className="mb-3 text-[15px] font-bold uppercase tracking-wide text-gray-900">
                  Bilplatser till besökare
                </h2>
                <p className="whitespace-pre-line text-[14px]">{form.visitorParkingInfo}</p>
              </section>
            )}
          </div>

          <div>
            <section>
              <h2 className="mb-4 text-[15px] font-bold uppercase tracking-wide text-gray-900">
                Dokument
              </h2>
              <div className="border border-gray-200 bg-white">
                <div className="grid grid-cols-2 px-6 py-4 text-[13px]">
                  <div>
                    <div className="font-semibold uppercase">{housing.area}</div>
                    <div className="mt-2 text-gray-600">Lägenhetstyp</div>
                    <div className="font-semibold">{housing.rooms} RUM o KÖK</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold uppercase">LT{housing.id.replace(/\D/g, "").slice(0, 6) || "105158"}</div>
                    <div className="mt-2 text-gray-600">&nbsp;</div>
                    <div>Ca {housing.size}</div>
                  </div>
                </div>

                <div className="flex justify-center px-6 pb-6">
                  <svg viewBox="0 0 220 200" className="h-[200px] w-auto">
                    <rect x="60" y="20" width="120" height="80" fill="none" stroke="#222" strokeWidth="2" />
                    <rect x="60" y="100" width="60" height="60" fill="none" stroke="#222" strokeWidth="2" />
                    <rect x="120" y="100" width="60" height="60" fill="none" stroke="#222" strokeWidth="2" />
                    <text x="110" y="55" fontSize="10" textAnchor="middle">RUM</text>
                    <text x="90" y="135" fontSize="9" textAnchor="middle">TRAPPHUS</text>
                    <text x="150" y="135" fontSize="9" textAnchor="middle">KÖK</text>
                    <text x="160" y="40" fontSize="8">G</text>
                    <text x="170" y="50" fontSize="8">L</text>
                    <text x="160" y="70" fontSize="8">K/F</text>
                  </svg>
                </div>

                <div className="px-6 pb-4 text-[10px] uppercase">
                  <div className="grid grid-cols-2 gap-2">
                    <div>━ Bärande väggar</div>
                    <div>┄ Icke bärande väggar</div>
                    <div>K Kapphylla</div>
                    <div>G Garderobsskåp</div>
                    <div>L Linneskåp</div>
                    <div>ST Städskåp</div>
                    <div>K/F Kyl/Frys</div>
                  </div>
                  <div className="mt-3 flex items-end gap-1 text-[9px]">
                    <span>METER</span>
                    {[0, 1, 2, 3, 4, 5].map((n) => (
                      <span key={n} className="flex flex-col items-center">
                        <span className="h-2 w-px bg-gray-700" />
                        <span>{n}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <button className="mt-4 w-full bg-[#a0287d] py-3 text-center text-[14px] font-semibold text-white">
                Dölj Planritning
              </button>
            </section>
          </div>
        </div>

        <div className="mt-16 bg-[#efeae3] px-6 py-12 text-center">
          <h3 className="mb-6 text-[16px] font-bold text-gray-900">Vill du bo här?</h3>
          <button className="bg-[#a0287d] px-8 py-3 text-[14px] font-semibold text-white">
            Gå vidare för att anmäla intresse
          </button>
          <p className="mt-6 text-[13px] text-gray-700">
            Sista anmälningsdatum är {lastApplicationDate}
          </p>
        </div>
      </main>

      <footer className="bg-[#00a3a1] px-6 py-12 text-white">
        <div className="mx-auto grid max-w-[1000px] grid-cols-1 gap-8 text-[13px] md:grid-cols-3">
          <div>
            <h4 className="mb-3 font-bold uppercase">Kontakta oss</h4>
            <p>Bostads AB Mimer</p>
            <p>Box 1170</p>
            <p>721 29 Västerås</p>
            <p className="mt-3">Organisationsnummer: 556019-3384</p>
            <p className="mt-3">Besöksadress: Gasverksgatan 7.</p>
            <p className="mt-3">Tel: 021-39 70 00</p>
            <p>E-post: <span className="underline">post@mimer.nu</span></p>
          </div>
          <div>
            <h4 className="mb-3 font-bold uppercase">Om webbplatsen</h4>
            <p className="underline">Behandling av personuppgifter</p>
            <p className="underline">Om webbplatsen</p>
            <p>Om cookies</p>
            <p>Other Languages</p>
            <div className="mt-4 flex gap-2 text-xl">
              <span>▦</span><span>●</span><span>■</span>
            </div>
          </div>
          <div>
            <h4 className="mb-3 font-bold uppercase">Sidor</h4>
            <p>Karriär</p>
            <p className="underline">Press</p>
            <p className="underline">Entreprenörer</p>
            <p className="underline">Blanketter och broschyrer</p>
            <p>Utmärkelsen Svensk Kvalitet</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
