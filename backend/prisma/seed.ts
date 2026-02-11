/**
 * Seed script for PMCH Hospital Utility App
 * 
 * Populates the database with realistic department, FAQ, and emergency contact data.
 * All text is bilingual (Hindi + English).
 * 
 * Run with: npx prisma db seed
 * Or:       npx ts-node prisma/seed.ts
 */

import { PrismaClient, ContactType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding database...');

    // ─── Clear existing data ────────────────────────────────────
    await prisma.emergencyContact.deleteMany();
    await prisma.fAQ.deleteMany();
    await prisma.department.deleteMany();

    // ─── Departments ────────────────────────────────────────────
    const departments = [
        {
            nameHi: 'हड्डी रोग विभाग',
            nameEn: 'Orthopaedics',
            descriptionHi: 'हड्डियों, जोड़ों और मांसपेशियों से संबंधित सभी समस्याओं का इलाज। फ्रैक्चर, जोड़ों का दर्द, और रीढ़ की हड्डी की समस्याएं।',
            descriptionEn: 'Treatment of all bone, joint, and muscle problems. Fractures, joint pain, and spinal issues.',
            opdTimings: 'Mon-Sat 8:00 AM - 2:00 PM',
            locationText: 'Block A, Ground Floor',
            locationTextHi: 'ब्लॉक A, भूतल',
            order: 1,
        },
        {
            nameHi: 'हृदय रोग विभाग',
            nameEn: 'Cardiology',
            descriptionHi: 'दिल से संबंधित सभी बीमारियों का इलाज। छाती में दर्द, दिल की धड़कन की समस्या, बीपी की जांच।',
            descriptionEn: 'Treatment of all heart-related diseases. Chest pain, heart rhythm problems, BP checkup.',
            opdTimings: 'Mon-Sat 9:00 AM - 1:00 PM',
            locationText: 'Block B, First Floor',
            locationTextHi: 'ब्लॉक B, पहली मंज़िल',
            order: 2,
        },
        {
            nameHi: 'सामान्य चिकित्सा',
            nameEn: 'General Medicine',
            descriptionHi: 'बुखार, सर्दी-खांसी, पेट दर्द, डायबिटीज, और अन्य सामान्य बीमारियों का इलाज।',
            descriptionEn: 'Treatment of fever, cold, cough, stomach pain, diabetes, and other common diseases.',
            opdTimings: 'Mon-Sat 8:00 AM - 3:00 PM',
            locationText: 'Block A, First Floor',
            locationTextHi: 'ब्लॉक A, पहली मंज़िल',
            order: 3,
        },
        {
            nameHi: 'सर्जरी विभाग',
            nameEn: 'General Surgery',
            descriptionHi: 'ऑपरेशन और सर्जरी से संबंधित सभी मामलों का इलाज। हर्निया, अपेंडिक्स, पित्ताशय की पथरी।',
            descriptionEn: 'Treatment of all surgical cases. Hernia, appendix, gallbladder stones.',
            opdTimings: 'Mon-Sat 9:00 AM - 2:00 PM',
            locationText: 'Block C, Ground Floor',
            locationTextHi: 'ब्लॉक C, भूतल',
            order: 4,
        },
        {
            nameHi: 'प्रसूति एवं स्त्री रोग',
            nameEn: 'Obstetrics & Gynaecology',
            descriptionHi: 'गर्भावस्था, प्रसव, महिलाओं की स्वास्थ्य समस्याएं। प्रसव पूर्व जांच और टीकाकरण।',
            descriptionEn: 'Pregnancy, delivery, women\'s health issues. Prenatal checkups and vaccination.',
            opdTimings: 'Mon-Sat 9:00 AM - 1:00 PM',
            locationText: 'Block D, Second Floor',
            locationTextHi: 'ब्लॉक D, दूसरी मंज़िल',
            order: 5,
        },
        {
            nameHi: 'बाल रोग विभाग',
            nameEn: 'Paediatrics',
            descriptionHi: 'बच्चों की सभी बीमारियों का इलाज। टीकाकरण, बुखार, दस्त, और विकास संबंधी समस्याएं।',
            descriptionEn: 'Treatment of all childhood diseases. Vaccination, fever, diarrhea, and developmental issues.',
            opdTimings: 'Mon-Sat 8:00 AM - 2:00 PM',
            locationText: 'Block D, Ground Floor',
            locationTextHi: 'ब्लॉक D, भूतल',
            order: 6,
        },
        {
            nameHi: 'नेत्र रोग विभाग',
            nameEn: 'Ophthalmology',
            descriptionHi: 'आंखों से संबंधित सभी समस्याओं का इलाज। मोतियाबिंद, चश्मे की जांच, आंखों में संक्रमण।',
            descriptionEn: 'Treatment of all eye problems. Cataract, eye testing, eye infections.',
            opdTimings: 'Mon-Fri 9:00 AM - 12:00 PM',
            locationText: 'Block B, Ground Floor',
            locationTextHi: 'ब्लॉक B, भूतल',
            order: 7,
        },
        {
            nameHi: 'त्वचा रोग विभाग',
            nameEn: 'Dermatology',
            descriptionHi: 'त्वचा, बाल और नाखून से संबंधित समस्याओं का इलाज। एलर्जी, खुजली, दाद, एक्जिमा।',
            descriptionEn: 'Treatment of skin, hair, and nail problems. Allergy, itching, ringworm, eczema.',
            opdTimings: 'Mon-Fri 10:00 AM - 1:00 PM',
            locationText: 'Block C, First Floor',
            locationTextHi: 'ब्लॉक C, पहली मंज़िल',
            order: 8,
        },
    ];

    for (const dept of departments) {
        await prisma.department.create({ data: dept });
    }
    console.log(`  ✅ Seeded ${departments.length} departments`);

    // ─── FAQs ───────────────────────────────────────────────────
    const faqs = [
        {
            questionHi: 'OPD में दिखाने के लिए क्या ज़रूरी है?',
            questionEn: 'What is required to visit the OPD?',
            answerHi: 'आपको अपना आधार कार्ड या कोई भी पहचान पत्र, पुरानी रिपोर्ट्स (अगर हों), और OPD कार्ड (अगर पहले बना हो) लेकर आना होगा।',
            answerEn: 'You need to bring your Aadhaar card or any ID proof, old reports (if any), and OPD card (if previously made).',
            category: 'opd',
        },
        {
            questionHi: 'OPD कार्ड कैसे बनवाएं?',
            questionEn: 'How to get an OPD card?',
            answerHi: 'OPD रजिस्ट्रेशन काउंटर पर जाएं। आधार कार्ड की कॉपी दें। ₹10 का शुल्क लगता है। कार्ड तुरंत बन जाता है।',
            answerEn: 'Go to the OPD registration counter. Submit a copy of Aadhaar card. Fee is ₹10. Card is made immediately.',
            category: 'opd',
        },
        {
            questionHi: 'इमरजेंसी कहां है?',
            questionEn: 'Where is the Emergency department?',
            answerHi: 'इमरजेंसी विभाग मुख्य गेट से अंदर आते ही बाईं तरफ है। यह 24 घंटे, 7 दिन खुला रहता है।',
            answerEn: 'The Emergency department is on the left side as you enter the main gate. It is open 24 hours, 7 days.',
            category: 'general',
        },
        {
            questionHi: 'एंबुलेंस कैसे बुलाएं?',
            questionEn: 'How to call an ambulance?',
            answerHi: '108 पर कॉल करें (सरकारी एंबुलेंस, मुफ़्त) या अस्पताल एंबुलेंस के लिए नीचे दिए गए इमरजेंसी नंबर पर कॉल करें।',
            answerEn: 'Call 108 (government ambulance, free) or call the hospital ambulance number listed in emergency contacts.',
            category: 'emergency',
        },
        {
            questionHi: 'भर्ती (एडमिशन) कैसे होता है?',
            questionEn: 'How does hospital admission work?',
            answerHi: 'पहले OPD में डॉक्टर को दिखाएं। डॉक्टर ज़रूरत लगने पर एडमिशन स्लिप देंगे। एडमिशन काउंटर पर जाकर स्लिप जमा करें।',
            answerEn: 'First visit the OPD doctor. Doctor will give an admission slip if needed. Submit the slip at the admission counter.',
            category: 'admission',
        },
        {
            questionHi: 'मरीज़ से मिलने का समय क्या है?',
            questionEn: 'What are the visiting hours?',
            answerHi: 'मरीज़ से मिलने का समय सुबह 10:00 से 12:00 और शाम 4:00 से 6:00 बजे तक है। ICU में केवल एक अटेंडेंट को जाने की अनुमति है।',
            answerEn: 'Visiting hours are 10:00 AM to 12:00 PM and 4:00 PM to 6:00 PM. Only one attendant is allowed in ICU.',
            category: 'general',
        },
        {
            questionHi: 'क्या यहां फ्री इलाज होता है?',
            questionEn: 'Is treatment free here?',
            answerHi: 'हां, यह सरकारी अस्पताल है। OPD कार्ड ₹10 का है। बाकी इलाज, दवाइयां और ऑपरेशन मुफ़्त हैं (उपलब्धता अनुसार)।',
            answerEn: 'Yes, this is a government hospital. OPD card costs ₹10. Rest of the treatment, medicines, and operations are free (subject to availability).',
            category: 'general',
        },
        {
            questionHi: 'ब्लड बैंक कहां है?',
            questionEn: 'Where is the Blood Bank?',
            answerHi: 'ब्लड बैंक ब्लॉक A के तहखाने (बेसमेंट) में है। यह 24 घंटे खुला रहता है।',
            answerEn: 'Blood Bank is in the basement of Block A. It is open 24 hours.',
            category: 'general',
        },
        {
            questionHi: 'रिपोर्ट कब मिलती है?',
            questionEn: 'When do reports come?',
            answerHi: 'ब्लड टेस्ट की रिपोर्ट अगले दिन, एक्स-रे तुरंत, MRI/CT स्कैन 2-3 दिन में मिलती है।',
            answerEn: 'Blood test reports come the next day, X-ray immediately, MRI/CT scan in 2-3 days.',
            category: 'opd',
        },
        {
            questionHi: 'शिकायत कहां करें?',
            questionEn: 'Where to file a complaint?',
            answerHi: 'शिकायत पेटी मुख्य गेट पर और OPD बिल्डिंग के बाहर रखी है। आप हेल्पडेस्क पर भी शिकायत कर सकते हैं।',
            answerEn: 'Complaint box is at the main gate and outside the OPD building. You can also complain at the helpdesk.',
            category: 'general',
        },
    ];

    for (const faq of faqs) {
        await prisma.fAQ.create({ data: faq });
    }
    console.log(`  ✅ Seeded ${faqs.length} FAQs`);

    // ─── Emergency Contacts ────────────────────────────────────
    const contacts = [
        {
            name: 'Hospital Ambulance',
            nameHi: 'अस्पताल एंबुलेंस',
            phone: '0612-2300100',
            type: ContactType.AMBULANCE,
        },
        {
            name: 'Government Ambulance (108)',
            nameHi: 'सरकारी एंबुलेंस (108)',
            phone: '108',
            type: ContactType.AMBULANCE,
        },
        {
            name: 'Emergency Ward',
            nameHi: 'इमरजेंसी वार्ड',
            phone: '0612-2300200',
            type: ContactType.EMERGENCY,
        },
        {
            name: 'Hospital Helpdesk',
            nameHi: 'अस्पताल हेल्पडेस्क',
            phone: '0612-2300300',
            type: ContactType.HELPDESK,
        },
        {
            name: 'Blood Bank',
            nameHi: 'ब्लड बैंक',
            phone: '0612-2300400',
            type: ContactType.EMERGENCY,
        },
    ];

    for (const contact of contacts) {
        await prisma.emergencyContact.create({ data: contact });
    }
    console.log(`  ✅ Seeded ${contacts.length} emergency contacts`);

    console.log('🌱 Seeding complete!');
}

main()
    .catch((e) => {
        console.error('❌ Seed error:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
