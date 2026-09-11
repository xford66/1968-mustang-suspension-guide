export const VENDOR_PAGES: Record<string, string> = {
  "Scott Drake": "https://www.scottdrake.com",
  Dynacorn: "https://www.dynacorn.com",
  "CJ Classics": "https://www.cjponyparts.com",
  ACP: "https://www.classicindustries.com",
  OER: "https://www.classicindustries.com",
  "Rare Parts": "https://www.npdlink.com",
  Opentracker: "https://opentrackerracing.com",
  "Global West": "https://www.globalwest.net",
  "Classic Performance Products": "https://www.classicperform.com",
  Hotchkis: "https://www.hotchkis.net",
  SPC: "https://www.spcperformance.com",
  "Total Control Products": "https://www.totalcontrolproducts.com",
  "Street or Track": "https://www.streetortrack.com",
  "Mike Maier Inc.": "https://www.mikemaierinc.com",
  QA1: "https://www.qa1.net",
  Ridetech: "https://www.ridetech.com",
  Heidts: "https://www.heidts.com",
  "Scott's Hot Rods": "https://www.scottshotrods.com",
  "Detroit Speed": "https://www.detroitspeed.com",
};

export function vendorPage(brand: string) {
  return VENDOR_PAGES[brand];
}
