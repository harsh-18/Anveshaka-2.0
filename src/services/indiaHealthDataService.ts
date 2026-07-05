export interface FacilityMetrics {
  name: string;
  bedsDeficitCount: number;
  status: 'FULL' | 'AVAIL';
}

export interface DistrictMetrics {
  name: string;
  cities: string[];
  facilities: FacilityMetrics[];
  isMetroHub?: boolean;
}

export interface FacilityMetadata {
  name: string;
  isMetro?: boolean;
}

export interface DistrictDirectory {
  cities: string[];
  facilities: FacilityMetadata[];
  isMetroHub?: boolean;
}

export interface StateDirectory {
  capital: string;
  districts: Record<string, DistrictDirectory>;
}

export interface IndiaGeoDirectory {
  [stateName: string]: StateDirectory;
}

const geoDirectory: IndiaGeoDirectory = {
  "Andhra Pradesh": { capital: "Amaravati", districts: { 
    "Visakhapatnam": { cities: ["Visakhapatnam"], isMetroHub: true, facilities: [{ name: "King George Hospital", isMetro: true }, { name: "VIMS" }, { name: "Apollo Hospitals" }] }, 
    "Vijayawada": { cities: ["Vijayawada", "Amaravati"], facilities: [{ name: "Government General Hospital" }, { name: "Manipal Hospital" }, { name: "NRI General Hospital" }] },
    "Guntur": { cities: ["Guntur"], facilities: [{ name: "Guntur Medical College" }, { name: "Ramesh Hospitals" }, { name: "Lalitha Super Speciality" }] },
    "Tirupati": { cities: ["Tirupati"], facilities: [{ name: "SVIMS" }, { name: "Ruia Hospital" }, { name: "BIRRD Hospital" }] },
    "Kurnool": { cities: ["Kurnool"], facilities: [{ name: "Kurnool Medical College" }, { name: "Medicover Hospitals" }, { name: "KIMS" }] }
  } },
  "Arunachal Pradesh": { capital: "Itanagar", districts: { 
    "Papum Pare": { cities: ["Itanagar", "Naharlagun"], facilities: [{ name: "Tomo Riba Institute" }, { name: "Ramakrishna Mission Hospital" }, { name: "Heema Hospital" }] },
    "Tawang": { cities: ["Tawang"], facilities: [{ name: "Khandro Drowa Zangmo District Hospital" }, { name: "CHC Tawang" }, { name: "Military Hospital Tawang" }] },
    "West Kameng": { cities: ["Bomdila"], facilities: [{ name: "District Hospital Bomdila" }, { name: "CHC Dirang" }, { name: "PHC Rupa" }] },
    "East Siang": { cities: ["Pasighat"], facilities: [{ name: "Bakin Pertin General Hospital" }, { name: "Pasighat CHC" }, { name: "Sille PHC" }] }
  } },
  "Assam": { capital: "Dispur", districts: { 
    "Kamrup Metropolitan": { cities: ["Guwahati", "Dispur"], isMetroHub: true, facilities: [{ name: "Gauhati Medical College", isMetro: true }, { name: "Mahendra Mohan Choudhury Hospital" }, { name: "Apollo Hospitals Guwahati" }] },
    "Dibrugarh": { cities: ["Dibrugarh"], facilities: [{ name: "Assam Medical College" }, { name: "Aditya Diagnostics & Hospital" }, { name: "Sanjivani Hospital" }] },
    "Silchar": { cities: ["Silchar"], facilities: [{ name: "Silchar Medical College" }, { name: "Green Heals Hospital" }, { name: "Valley Hospital" }] },
    "Jorhat": { cities: ["Jorhat"], facilities: [{ name: "Jorhat Medical College" }, { name: "Mission Hospital" }, { name: "Sanjivani Diagnostic" }] }
  } },
  "Bihar": { capital: "Patna", districts: { 
    "Patna": { cities: ["Patna"], isMetroHub: true, facilities: [{ name: "PMCH", isMetro: true }, { name: "AIIMS Patna", isMetro: true }, { name: "NMCH" }, { name: "IGIMS" }, { name: "Paras HMRI Hospital" }] },
    "Muzaffarpur": { cities: ["Muzaffarpur"], facilities: [{ name: "SKMCH" }, { name: "Sadar Hospital" }, { name: "Prashant Memorial Hospital" }] },
    "Gaya": { cities: ["Gaya"], facilities: [{ name: "ANMMCH" }, { name: "Pilgrim Hospital" }, { name: "Magadh Hospital" }] },
    "Bhagalpur": { cities: ["Bhagalpur"], facilities: [{ name: "JLNMCH" }, { name: "Sadar Hospital Bhagalpur" }, { name: "Gloacal Hospital" }] }
  } },
  "Chhattisgarh": { capital: "Raipur", districts: { 
    "Raipur": { cities: ["Raipur"], isMetroHub: true, facilities: [{ name: "AIIMS Raipur", isMetro: true }, { name: "Dr. B.R. Ambedkar Hospital" }, { name: "Ramkrishna CARE" }, { name: "MMI Narayana" }] },
    "Bilaspur": { cities: ["Bilaspur"], facilities: [{ name: "CIMS" }, { name: "Apollo Hospitals Bilaspur" }, { name: "Sadar Hospital" }] },
    "Durg": { cities: ["Durg", "Bhilai"], facilities: [{ name: "JLNH Bhilai" }, { name: "District Hospital Durg" }, { name: "Apollo BSR Hospital" }] },
    "Bastar": { cities: ["Jagdalpur"], facilities: [{ name: "Government Medical College Jagdalpur" }, { name: "Maharani Hospital" }, { name: "Maa Danteshwari Hospital" }] }
  } },
  "Goa": { capital: "Panaji", districts: { 
    "North Goa": { cities: ["Panaji", "Mapusa"], facilities: [{ name: "Goa Medical College" }, { name: "North Goa District Hospital" }, { name: "Manipal Hospitals Goa" }] },
    "South Goa": { cities: ["Margao", "Vasco"], facilities: [{ name: "South Goa District Hospital" }, { name: "Victor Hospital" }, { name: "Salgaocar Hospital" }] },
    "Ponda": { cities: ["Ponda"], facilities: [{ name: "Sub-District Hospital Ponda" }, { name: "Savoikar Hospital" }, { name: "Ravi Naik Hospital" }] }
  } },
  "Gujarat": { capital: "Gandhinagar", districts: { 
    "Ahmedabad": { cities: ["Ahmedabad"], isMetroHub: true, facilities: [{ name: "Ahmedabad Civil Hospital", isMetro: true }, { name: "SVP Hospital" }, { name: "Zydus Hospital" }, { name: "Apollo Hospitals" }] },
    "Surat": { cities: ["Surat"], isMetroHub: true, facilities: [{ name: "New Civil Hospital" }, { name: "SMIMER" }, { name: "Kiran Super Multi Speciality" }] },
    "Vadodara": { cities: ["Vadodara"], facilities: [{ name: "SSG Hospital" }, { name: "Sterling Hospital" }, { name: "Bhailal Amin General" }] },
    "Rajkot": { cities: ["Rajkot"], facilities: [{ name: "PDU Civil Hospital" }, { name: "Wockhardt Hospital" }, { name: "Synergy Super Speciality" }] }
  } },
  "Haryana": { capital: "Chandigarh", districts: { 
    "Gurugram": { cities: ["Gurugram"], isMetroHub: true, facilities: [{ name: "Medanta The Medicity", isMetro: true }, { name: "Fortis Memorial" }, { name: "Artemis Hospital" }, { name: "Civil Hospital" }] },
    "Faridabad": { cities: ["Faridabad"], isMetroHub: true, facilities: [{ name: "ESIC Medical College" }, { name: "Asian Institute of Medical Sciences" }, { name: "Fortis Escorts" }] },
    "Rohtak": { cities: ["Rohtak"], facilities: [{ name: "PGIMS Rohtak" }, { name: "Civil Hospital Rohtak" }, { name: "Holy Heart Hospital" }] },
    "Ambala": { cities: ["Ambala"], facilities: [{ name: "Civil Hospital Ambala" }, { name: "MM Institute of Medical Sciences" }, { name: "Philadelphia Hospital" }] }
  } },
  "Himachal Pradesh": { capital: "Shimla", districts: { 
    "Shimla": { cities: ["Shimla"], facilities: [{ name: "IGMC Shimla" }, { name: "DDU Hospital" }, { name: "Kamla Nehru Hospital" }] },
    "Kangra": { cities: ["Dharamshala", "Kangra"], facilities: [{ name: "Dr. RPGMC Tanda" }, { name: "Zonal Hospital Dharamshala" }, { name: "Fortis Kangra" }] },
    "Mandi": { cities: ["Mandi"], facilities: [{ name: "SLBSGMC Nerchowk" }, { name: "Zonal Hospital Mandi" }, { name: "Ramakrishna Mission" }] },
    "Solan": { cities: ["Solan"], facilities: [{ name: "Regional Hospital Solan" }, { name: "MMU Medical College" }, { name: "Civil Hospital" }] }
  } },
  "Jharkhand": { capital: "Ranchi", districts: { 
    "Ranchi": { cities: ["Ranchi"], isMetroHub: true, facilities: [{ name: "RIMS Ranchi", isMetro: true }, { name: "Sadar Hospital" }, { name: "Medica Super Speciality" }, { name: "Bhagwan Mahavir Medica" }] },
    "East Singhbhum": { cities: ["Jamshedpur"], facilities: [{ name: "Tata Main Hospital" }, { name: "MGM Medical College" }, { name: "Brahmananda Narayana" }] },
    "Dhanbad": { cities: ["Dhanbad"], facilities: [{ name: "SNMMCH Dhanbad" }, { name: "Central Hospital" }, { name: "Asarfi Hospital" }] },
    "Bokaro": { cities: ["Bokaro"], facilities: [{ name: "Bokaro General Hospital" }, { name: "KM Memorial" }, { name: "Sadar Hospital" }] }
  } },
  "Karnataka": { capital: "Bengaluru", districts: { 
    "Bengaluru Urban": { cities: ["Bengaluru"], isMetroHub: true, facilities: [{ name: "Victoria Hospital", isMetro: true }, { name: "Bowring Hospital", isMetro: true }, { name: "NIMHANS", isMetro: true }, { name: "Manipal Hospital" }] },
    "Mysuru": { cities: ["Mysuru"], facilities: [{ name: "K R Hospital" }, { name: "JSS Hospital" }, { name: "Apollo BGS" }] },
    "Dakshina Kannada": { cities: ["Mangaluru"], facilities: [{ name: "Wenlock District Hospital" }, { name: "KMC Hospital" }, { name: "Father Muller Medical College" }] },
    "Belagavi": { cities: ["Belagavi"], facilities: [{ name: "BIMS Hospital" }, { name: "KLE Prabhakar Kore" }, { name: "District Hospital" }] }
  } },
  "Kerala": { capital: "Thiruvananthapuram", districts: { 
    "Thiruvananthapuram": { cities: ["Thiruvananthapuram"], isMetroHub: true, facilities: [{ name: "Trivandrum Medical College", isMetro: true }, { name: "General Hospital TVM" }, { name: "KIMSHEALTH" }, { name: "Sree Chitra Tirunal Institute" }] },
    "Ernakulam": { cities: ["Kochi"], isMetroHub: true, facilities: [{ name: "Ernakulam General Hospital", isMetro: true }, { name: "Government Medical College Kalamassery" }, { name: "Amrita Hospital" }, { name: "Aster Medcity" }] },
    "Kozhikode": { cities: ["Kozhikode"], facilities: [{ name: "Kozhikode Medical College" }, { name: "Aster MIMS" }, { name: "Baby Memorial Hospital" }] },
    "Thrissur": { cities: ["Thrissur"], facilities: [{ name: "Thrissur Medical College" }, { name: "Amala Institute" }, { name: "Jubilee Mission" }] }
  } },
  "Madhya Pradesh": { capital: "Bhopal", districts: { 
    "Bhopal": { cities: ["Bhopal"], isMetroHub: true, facilities: [{ name: "AIIMS Bhopal", isMetro: true }, { name: "Hamidia Hospital" }, { name: "Bansal Hospital" }, { name: "Chirayu Medical College" }] },
    "Indore": { cities: ["Indore"], isMetroHub: true, facilities: [{ name: "MY Hospital", isMetro: true }, { name: "Bombay Hospital Indore" }, { name: "Choithram Hospital" }] },
    "Gwalior": { cities: ["Gwalior"], facilities: [{ name: "JAH Hospital" }, { name: "Sahara Hospital" }, { name: "Birla Hospital" }] },
    "Jabalpur": { cities: ["Jabalpur"], facilities: [{ name: "Netaji Subhash Chandra Bose MC" }, { name: "Metro Hospital" }, { name: "Jabalpur Hospital" }] }
  } },
  "Maharashtra": { capital: "Mumbai", districts: { 
    "Mumbai": { cities: ["Mumbai City", "Mumbai Suburban"], isMetroHub: true, facilities: [{ name: "KEM Hospital", isMetro: true }, { name: "Sion Hospital", isMetro: true }, { name: "JJ Hospital", isMetro: true }, { name: "Lilavati Hospital" }] },
    "Pune": { cities: ["Pune", "Pimpri-Chinchwad"], isMetroHub: true, facilities: [{ name: "Sassoon General", isMetro: true }, { name: "YCM Hospital" }, { name: "Ruby Hall Clinic" }, { name: "Jehangir Hospital" }] },
    "Nagpur": { cities: ["Nagpur"], isMetroHub: true, facilities: [{ name: "GMC Nagpur", isMetro: true }, { name: "IGGMC Nagpur" }, { name: "Kingsway Hospitals" }] },
    "Nashik": { cities: ["Nashik"], facilities: [{ name: "Civil Hospital Nashik" }, { name: "Ashoka Medicover" }, { name: "Wockhardt Hospital" }] }
  } },
  "Manipur": { capital: "Imphal", districts: { 
    "Imphal West": { cities: ["Imphal"], facilities: [{ name: "RIMS Imphal" }, { name: "JNIMS" }, { name: "Shija Hospitals" }] },
    "Imphal East": { cities: ["Imphal East"], facilities: [{ name: "District Hospital Imphal East" }, { name: "Porompat CHC" }, { name: "Khurai PHC" }] },
    "Churachandpur": { cities: ["Churachandpur"], facilities: [{ name: "District Hospital Churachandpur" }, { name: "Sielmat Christian Hospital" }, { name: "Zenith Academy Hospital" }] },
    "Thoubal": { cities: ["Thoubal"], facilities: [{ name: "District Hospital Thoubal" }, { name: "CHC Kakching" }, { name: "Yairipok CHC" }] }
  } },
  "Meghalaya": { capital: "Shillong", districts: { 
    "East Khasi Hills": { cities: ["Shillong"], facilities: [{ name: "NEIGRIHMS" }, { name: "Civil Hospital Shillong" }, { name: "Bethany Hospital" }] },
    "West Garo Hills": { cities: ["Tura"], facilities: [{ name: "Tura Civil Hospital" }, { name: "Holy Cross Hospital" }, { name: "Christian Hospital" }] },
    "Jaintia Hills": { cities: ["Jowai"], facilities: [{ name: "Jowai Civil Hospital" }, { name: "Norman Tunnel Hospital" }, { name: "Woodland Jowai" }] },
    "Ri Bhoi": { cities: ["Nongpoh"], facilities: [{ name: "Nongpoh Civil Hospital" }, { name: "Bethany Hospital Nongpoh" }, { name: "CHC Umsning" }] }
  } },
  "Mizoram": { capital: "Aizawl", districts: { 
    "Aizawl": { cities: ["Aizawl"], facilities: [{ name: "Civil Hospital Aizawl" }, { name: "Zoram Medical College" }, { name: "Synod Hospital" }] },
    "Lunglei": { cities: ["Lunglei"], facilities: [{ name: "Civil Hospital Lunglei" }, { name: "Christian Hospital Serkawn" }, { name: "Hope Hospital" }] },
    "Champhai": { cities: ["Champhai"], facilities: [{ name: "District Hospital Champhai" }, { name: "Bethesda Hospital" }, { name: "Christian Hospital" }] },
    "Serchhip": { cities: ["Serchhip"], facilities: [{ name: "District Hospital Serchhip" }, { name: "Thenzawl CHC" }, { name: "Chhingchhip PHC" }] }
  } },
  "Nagaland": { capital: "Kohima", districts: { 
    "Kohima": { cities: ["Kohima"], facilities: [{ name: "Naga Hospital Authority" }, { name: "Oking Hospital" }, { name: "Bethel Medical Centre" }] },
    "Dimapur": { cities: ["Dimapur"], facilities: [{ name: "District Hospital Dimapur" }, { name: "Christian Institute of Health Sciences" }, { name: "Zion Hospital" }] },
    "Mokokchung": { cities: ["Mokokchung"], facilities: [{ name: "IMDH Mokokchung" }, { name: "Woodland Nursing Home" }, { name: "Lenjem Hospital" }] },
    "Tuensang": { cities: ["Tuensang"], facilities: [{ name: "District Hospital Tuensang" }, { name: "Eksing Hospital" }, { name: "Longkhim CHC" }] }
  } },
  "Odisha": { capital: "Bhubaneswar", districts: { 
    "Khordha": { cities: ["Bhubaneswar"], isMetroHub: true, facilities: [{ name: "AIIMS Bhubaneswar", isMetro: true }, { name: "Capital Hospital" }, { name: "KIMS" }, { name: "SUM Hospital" }] },
    "Cuttack": { cities: ["Cuttack"], facilities: [{ name: "SCB Medical College" }, { name: "Ashwini Hospital" }, { name: "Shanti Memorial" }] },
    "Ganjam": { cities: ["Brahmapur"], facilities: [{ name: "MKCG Medical College" }, { name: "City Hospital" }, { name: "Christian Hospital" }] },
    "Sundargarh": { cities: ["Rourkela"], facilities: [{ name: "Ispat General Hospital" }, { name: "Rourkela Government Hospital" }, { name: "Hi-Tech Medical College" }] }
  } },
  "Punjab": { capital: "Chandigarh", districts: { 
    "Ludhiana": { cities: ["Ludhiana"], isMetroHub: true, facilities: [{ name: "Civil Hospital Ludhiana" }, { name: "CMCH Ludhiana" }, { name: "DMCH" }, { name: "Fortis Hospital" }] },
    "Amritsar": { cities: ["Amritsar"], facilities: [{ name: "Government Medical College" }, { name: "Civil Hospital" }, { name: "Sri Guru Ram Das Institute" }] },
    "Jalandhar": { cities: ["Jalandhar"], facilities: [{ name: "Civil Hospital Jalandhar" }, { name: "PIMS" }, { name: "Sacred Heart Hospital" }] },
    "Patiala": { cities: ["Patiala"], facilities: [{ name: "Rajindra Hospital" }, { name: "Columbia Asia" }, { name: "Amar Hospital" }] }
  } },
  "Rajasthan": { capital: "Jaipur", districts: { 
    "Jaipur": { cities: ["Jaipur"], isMetroHub: true, facilities: [{ name: "SMS Hospital", isMetro: true }, { name: "RUHS" }, { name: "Fortis Escorts" }, { name: "Mahatma Gandhi Hospital" }] },
    "Jodhpur": { cities: ["Jodhpur"], facilities: [{ name: "AIIMS Jodhpur", isMetro: true }, { name: "MDM Hospital" }, { name: "Medipulse Hospital" }] },
    "Udaipur": { cities: ["Udaipur"], facilities: [{ name: "MB Government Hospital" }, { name: "Geetanjali Hospital" }, { name: "Pacific Medical College" }] },
    "Kota": { cities: ["Kota"], facilities: [{ name: "MBS Hospital" }, { name: "New Medical College Hospital" }, { name: "Sudha Hospital" }] }
  } },
  "Sikkim": { capital: "Gangtok", districts: { 
    "East Sikkim": { cities: ["Gangtok"], facilities: [{ name: "STNM Hospital" }, { name: "CRH Manipal" }, { name: "Sanjivani Hospital" }] },
    "West Sikkim": { cities: ["Gyalshing"], facilities: [{ name: "District Hospital Gyalshing" }, { name: "Soreng CHC" }, { name: "Dentam PHC" }] },
    "South Sikkim": { cities: ["Namchi"], facilities: [{ name: "District Hospital Namchi" }, { name: "Ravangla CHC" }, { name: "Jorethang PHC" }] },
    "North Sikkim": { cities: ["Mangan"], facilities: [{ name: "District Hospital Mangan" }, { name: "Chungthang PHC" }, { name: "Phodong PHC" }] }
  } },
  "Tamil Nadu": { capital: "Chennai", districts: { 
    "Chennai": { cities: ["Chennai"], isMetroHub: true, facilities: [{ name: "Rajiv Gandhi GH", isMetro: true }, { name: "Stanley Medical", isMetro: true }, { name: "Kilpauk Medical College", isMetro: true }, { name: "Apollo Hospitals Greams Road" }] },
    "Coimbatore": { cities: ["Coimbatore"], isMetroHub: true, facilities: [{ name: "Coimbatore Medical College" }, { name: "ESI Hospital" }, { name: "GKNM Hospital" }] },
    "Madurai": { cities: ["Madurai"], facilities: [{ name: "Madurai Medical College" }, { name: "Meenakshi Mission" }, { name: "Velammal Medical College" }] },
    "Tiruchirappalli": { cities: ["Trichy"], facilities: [{ name: "Mahatma Gandhi Memorial" }, { name: "Apollo Specialty" }, { name: "Kauvery Hospital" }] }
  } },
  "Telangana": { capital: "Hyderabad", districts: { 
    "Hyderabad": { cities: ["Hyderabad"], isMetroHub: true, facilities: [{ name: "Osmania General", isMetro: true }, { name: "Gandhi Hospital", isMetro: true }, { name: "NIMS", isMetro: true }, { name: "Apollo Jubilee Hills" }] },
    "Warangal": { cities: ["Warangal"], facilities: [{ name: "MGM Hospital" }, { name: "Rohini Super Speciality" }, { name: "Jaya Hospital" }] },
    "Karimnagar": { cities: ["Karimnagar"], facilities: [{ name: "District HQ Hospital" }, { name: "Chalmeda Anand Rao" }, { name: "Renee Hospital" }] },
    "Nizamabad": { cities: ["Nizamabad"], facilities: [{ name: "Government General Hospital" }, { name: "Pragathi Hospital" }, { name: "Hope Hospital" }] }
  } },
  "Tripura": { capital: "Agartala", districts: { 
    "West Tripura": { cities: ["Agartala"], facilities: [{ name: "AGMC & GBP Hospital" }, { name: "IGM Hospital" }, { name: "TMC & Dr. BRAM Teaching Hospital" }] },
    "Gomati": { cities: ["Udaipur"], facilities: [{ name: "Gomati District Hospital" }, { name: "Amarpur CHC" }, { name: "Killa PHC" }] },
    "South Tripura": { cities: ["Belonia"], facilities: [{ name: "South Tripura District Hospital" }, { name: "Santirbazar District Hospital" }, { name: "Sabroom CHC" }] },
    "North Tripura": { cities: ["Dharmanagar"], facilities: [{ name: "North Tripura District Hospital" }, { name: "Kanchanpur Sub-Divisional" }, { name: "Panisagar CHC" }] }
  } },
  "Uttar Pradesh": { capital: "Lucknow", districts: { 
    "Lucknow": { cities: ["Lucknow"], isMetroHub: true, facilities: [{ name: "KGMU", isMetro: true }, { name: "SGPGI", isMetro: true }, { name: "RMLIMS" }, { name: "Medanta Lucknow" }] },
    "Gautam Buddha Nagar": { cities: ["Noida", "Greater Noida"], isMetroHub: true, facilities: [{ name: "GIMS Greater Noida" }, { name: "District Hospital Noida" }, { name: "Fortis Hospital Noida" }] },
    "Kanpur Nagar": { cities: ["Kanpur"], isMetroHub: true, facilities: [{ name: "GSVM Medical College" }, { name: "Hallet Hospital" }, { name: "Regency Hospital" }] },
    "Varanasi": { cities: ["Varanasi"], facilities: [{ name: "Sir Sunderlal Hospital (BHU)" }, { name: "Deen Dayal Upadhyay Hospital" }, { name: "Apex Hospital" }] },
    "Agra": { cities: ["Agra"], facilities: [{ name: "SN Medical College" }, { name: "District Hospital Agra" }, { name: "Pushpanjali Hospital" }] }
  } },
  "Uttarakhand": { capital: "Dehradun", districts: { 
    "Dehradun": { cities: ["Dehradun"], facilities: [{ name: "Doon Hospital" }, { name: "AIIMS Rishikesh", isMetro: true }, { name: "Max Super Speciality" }] },
    "Haridwar": { cities: ["Haridwar", "Roorkee"], facilities: [{ name: "District Hospital Haridwar" }, { name: "Civil Hospital Roorkee" }, { name: "Metro Hospital" }] },
    "Nainital": { cities: ["Haldwani", "Nainital"], facilities: [{ name: "Dr. Susheela Tiwari Government Hospital" }, { name: "BD Pandey Hospital" }, { name: "Brij Lal Hospital" }] },
    "Udham Singh Nagar": { cities: ["Rudrapur"], facilities: [{ name: "Jawahar Lal Nehru District Hospital" }, { name: "Medicity Hospital" }, { name: "Kalyani Hospital" }] }
  } },
  "West Bengal": { capital: "Kolkata", districts: { 
    "Kolkata": { cities: ["Kolkata"], isMetroHub: true, facilities: [{ name: "Medical College Kolkata", isMetro: true }, { name: "SSKM Hospital", isMetro: true }, { name: "NRS Medical College" }, { name: "Apollo Multispeciality" }] },
    "North 24 Parganas": { cities: ["Barasat", "Salt Lake"], isMetroHub: true, facilities: [{ name: "Barasat District Hospital" }, { name: "RG Kar Medical College" }, { name: "AMRI Salt Lake" }] },
    "Howrah": { cities: ["Howrah"], isMetroHub: true, facilities: [{ name: "Howrah District Hospital" }, { name: "Narayana Multispeciality" }, { name: "Sanjiban Hospital" }] },
    "Darjeeling": { cities: ["Siliguri", "Darjeeling"], facilities: [{ name: "North Bengal Medical College" }, { name: "Darjeeling District Hospital" }, { name: "Neotia Getwel" }] }
  } },
  "Andaman and Nicobar Islands": { capital: "Port Blair", districts: { 
    "South Andaman": { cities: ["Port Blair"], facilities: [{ name: "G.B. Pant Hospital" }, { name: "ANIIMS" }, { name: "Pillar Health Centre" }] },
    "North and Middle Andaman": { cities: ["Mayabunder"], facilities: [{ name: "Dr. R.P. Hospital" }, { name: "CHC Rangat" }, { name: "CHC Diglipur" }] },
    "Nicobar": { cities: ["Car Nicobar"], facilities: [{ name: "BJR Hospital" }, { name: "CHC Nancowry" }, { name: "PHC Campbell Bay" }] }
  } },
  "Chandigarh": { capital: "Chandigarh", districts: { 
    "Chandigarh": { cities: ["Chandigarh"], isMetroHub: true, facilities: [{ name: "PGIMER", isMetro: true }, { name: "GMCH Sector 32", isMetro: true }, { name: "GMSH Sector 16" }, { name: "Mukat Hospital" }] }
  } },
  "Dadra and Nagar Haveli and Daman and Diu": { capital: "Daman", districts: { 
    "Daman": { cities: ["Daman"], facilities: [{ name: "Government Hospital Marwad" }, { name: "CHC Moti Daman" }, { name: "PHC Bhimpore" }] },
    "Dadra and Nagar Haveli": { cities: ["Silvassa"], facilities: [{ name: "Shri Vinoba Bhave Civil Hospital" }, { name: "CHC Khanvel" }, { name: "Yogi Hospital" }] },
    "Diu": { cities: ["Diu"], facilities: [{ name: "Government Hospital Diu" }, { name: "CHC Ghoghla" }, { name: "PHC Vanakbara" }] }
  } },
  "Delhi": { capital: "New Delhi", districts: { 
    "New Delhi": { cities: ["New Delhi"], isMetroHub: true, facilities: [{ name: "AIIMS", isMetro: true }, { name: "Safdarjung Hospital", isMetro: true }, { name: "RML Hospital", isMetro: true }, { name: "LNJP Hospital", isMetro: true }] },
    "South Delhi": { cities: ["Saket", "Hauz Khas"], isMetroHub: true, facilities: [{ name: "Max Super Speciality", isMetro: true }, { name: "Apollo Hospital", isMetro: true }, { name: "Batra Hospital" }] },
    "North West Delhi": { cities: ["Rohini", "Pitampura"], isMetroHub: true, facilities: [{ name: "Dr. Baba Saheb Ambedkar Hospital" }, { name: "Jaipur Golden Hospital" }, { name: "Bhagwan Mahavir Hospital" }] },
    "East Delhi": { cities: ["Preet Vihar", "Shahdara"], isMetroHub: true, facilities: [{ name: "GTB Hospital", isMetro: true }, { name: "LBS Hospital" }, { name: "Max Super Speciality Patparganj" }] }
  } },
  "Jammu and Kashmir": { capital: "Srinagar", districts: { 
    "Srinagar": { cities: ["Srinagar"], isMetroHub: true, facilities: [{ name: "SMHS Hospital", isMetro: true }, { name: "SKIMS", isMetro: true }, { name: "Lal Ded Hospital" }] },
    "Jammu": { cities: ["Jammu"], isMetroHub: true, facilities: [{ name: "GMC Jammu", isMetro: true }, { name: "Super Speciality Hospital Jammu" }, { name: "SMGS Hospital" }] },
    "Anantnag": { cities: ["Anantnag"], facilities: [{ name: "GMC Anantnag" }, { name: "District Hospital Anantnag" }, { name: "Rehmat-e-Alam Hospital" }] },
    "Baramulla": { cities: ["Baramulla"], facilities: [{ name: "GMC Baramulla" }, { name: "District Hospital Baramulla" }, { name: "St. Joseph's Hospital" }] }
  } },
  "Ladakh": { capital: "Leh", districts: { 
    "Leh": { cities: ["Leh"], facilities: [{ name: "SNM Hospital" }, { name: "Mahabodhi Karuna Charitable Hospital" }, { name: "PHC Choglamsar" }] },
    "Kargil": { cities: ["Kargil"], facilities: [{ name: "District Hospital Kargil" }, { name: "CHC Drass" }, { name: "CHC Sankoo" }] }
  } },
  "Lakshadweep": { capital: "Kavaratti", districts: { 
    "Kavaratti": { cities: ["Kavaratti"], facilities: [{ name: "Indira Gandhi Hospital" }, { name: "Rajiv Gandhi Specialty Hospital" }] },
    "Minicoy": { cities: ["Minicoy"], facilities: [{ name: "Government Hospital Minicoy" }] },
    "Agatti": { cities: ["Agatti"], facilities: [{ name: "CHC Agatti" }, { name: "PHC Agatti" }] }
  } },
  "Puducherry": { capital: "Puducherry", districts: { 
    "Puducherry": { cities: ["Puducherry"], isMetroHub: true, facilities: [{ name: "JIPMER", isMetro: true }, { name: "Indira Gandhi Medical College" }, { name: "Rajiv Gandhi Hospital" }] },
    "Karaikal": { cities: ["Karaikal"], facilities: [{ name: "Government General Hospital Karaikal" }, { name: "JIPMER Karaikal" }, { name: "Vinayaka Missions Hospital" }] },
    "Mahe": { cities: ["Mahe"], facilities: [{ name: "Government General Hospital Mahe" }, { name: "CHC Palloor" }] },
    "Yanam": { cities: ["Yanam"], facilities: [{ name: "Government General Hospital Yanam" }] }
  } }
};

const generateFluctuatingMetrics = (facility: FacilityMetadata, isMetroHub: boolean = false): FacilityMetrics => {
  // Base scale logic for real-world scales
  const baseCapacity = facility.isMetro || isMetroHub 
    ? 800 + Math.floor(Math.random() * 1200) 
    : 150 + Math.floor(Math.random() * 350);
  
  // Real-world fluctuation (occupancy from 60% to 105%)
  const occupancyRate = 0.6 + Math.random() * 0.45; 
  
  let bedsDeficitCount = 0;
  let status: 'FULL' | 'AVAIL' = 'AVAIL';

  if (occupancyRate >= 1.0) {
    status = 'FULL';
    // Deficit scales with capacity
    bedsDeficitCount = Math.floor(baseCapacity * (occupancyRate - 1.0));
    // Provide a minimum deficit if marked full
    if (bedsDeficitCount < 5) bedsDeficitCount = 5 + Math.floor(Math.random() * 20); 
  } else if (occupancyRate > 0.85) {
    // High occupancy can cause minor temporary deficits in specialized wards
    bedsDeficitCount = Math.floor(Math.random() * (baseCapacity * 0.05));
  }

  // Force random minor fluctuation to simulate real-time moving numbers
  if (Math.random() > 0.7 && status !== 'FULL') {
    bedsDeficitCount = Math.floor(Math.random() * 15);
  }

  return {
    name: facility.name,
    bedsDeficitCount,
    status
  };
};

export const getMetricsByLocation = (state: string, district: string): DistrictMetrics | null => {
  const stateData = geoDirectory[state];
  if (!stateData) {
    return null;
  }
  
  const districtData = stateData.districts[district];
  if (!districtData) {
    return null;
  }
  
  const facilities = districtData.facilities.map(f => generateFluctuatingMetrics(f, districtData.isMetroHub));
  
  // To ensure the UI often has something actionable to show, occasionally force a FULL status
  if (Math.random() > 0.6 && facilities.length > 0) {
    const idx = Math.floor(Math.random() * facilities.length);
    if (facilities[idx].status !== 'FULL') {
      facilities[idx].status = 'FULL';
      facilities[idx].bedsDeficitCount = 20 + Math.floor(Math.random() * 80);
    }
  }

  return {
    name: district,
    cities: districtData.cities,
    facilities,
    isMetroHub: districtData.isMetroHub
  };
};

export const getStates = (): string[] => {
  return Object.keys(geoDirectory).sort();
};

export const getDistricts = (state: string): string[] => {
  const stateData = geoDirectory[state];
  return stateData ? Object.keys(stateData.districts).sort() : [];
};

