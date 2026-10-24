import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db/mongodb';
import { hashPassword } from '@/lib/auth';
import User from '@/models/User';
import Plan from '@/models/Plan';
import Trainer from '@/models/Trainer';
import Equipment from '@/models/Equipment';
import Event from '@/models/Event';
import GalleryPost from '@/models/GalleryPost';
import TransformationStory from '@/models/TransformationStory';
import Enquiry from '@/models/Enquiry';

export async function POST() {
  try {
    await connectToDatabase();

    // 1. Clear existing collections for a fresh seed
    await Promise.all([
      User.deleteMany({}),
      Plan.deleteMany({}),
      Trainer.deleteMany({}),
      Equipment.deleteMany({}),
      Event.deleteMany({}),
      GalleryPost.deleteMany({}),
      TransformationStory.deleteMany({}),
      Enquiry.deleteMany({}),
    ]);

    // 2. Seed Membership Plans
    const plans = await Plan.insertMany([
      {
        name: 'Bronze Essential',
        tier: 'Bronze',
        description: 'Standard gym floor access and cardio equipment for self-directed lifters.',
        monthlyPrice: 2499,
        quarterlyPrice: 6499,
        yearlyPrice: 21999,
        features: [
          'Complete Gym Floor Access',
          'Standard Free Weight Area',
          'Locker Room & Shower Access',
          'Fitness Orientation Session',
        ],
        excludedFeatures: [
          'Steam Bath Recovery Suite',
          'CrossFit Functional Arena',
          'Personal Trainer Diet Protocol',
        ],
      },
      {
        name: 'Silver Active',
        tier: 'Silver',
        description: 'Comprehensive training access with CrossFit arena and group classes included.',
        monthlyPrice: 3499,
        quarterlyPrice: 8999,
        yearlyPrice: 29999,
        features: [
          'Complete Gym Floor Access',
          'CrossFit Functional Turf Arena',
          'Zumba & Aerobics Group Classes',
          'Quarterly Body Composition Scan',
          'Locker Room & Shower Access',
        ],
        excludedFeatures: ['Steam Bath Recovery Suite', 'Personal Trainer Diet Protocol'],
      },
      {
        name: 'Gold VIP Pass',
        tier: 'Gold VIP',
        description: 'Full facility access including steam bath therapy and personalized nutrition programming.',
        monthlyPrice: 4999,
        quarterlyPrice: 12999,
        yearlyPrice: 42999,
        isPopular: true,
        features: [
          'Unlimited All-Area Gym Access',
          'CrossFit Turf & Heavy Rig Arena',
          'Steam Bath & Recovery Spa (Unlimited)',
          'Personalized Macro Nutrition Protocol',
          'Monthly 1-on-1 Trainer Review',
          'All Group Fitness & Zumba Classes',
        ],
        excludedFeatures: ['Permanent Reserved VIP Locker'],
      },
      {
        name: 'Titanium Elite',
        tier: 'Titanium Elite',
        description: 'The pinnacle luxury pass with dedicated 1-on-1 personal training and private VIP amenities.',
        monthlyPrice: 14999,
        quarterlyPrice: 38999,
        yearlyPrice: 129999,
        isPremium: true,
        features: [
          'All Gold VIP Amenities Included',
          '12 Personal Training Sessions / Month',
          'Permanent Reserved VIP Private Locker',
          'Complimentary Whey & Pre-Workout Shake Bar',
          'Custom Blood Panel & Hormone Review',
          'Direct 24/7 WhatsApp Coach Access',
        ],
        excludedFeatures: [],
      },
    ]);

    const goldPlan = plans.find((p) => p.tier === 'Gold VIP') || plans[0];
    const silverPlan = plans.find((p) => p.tier === 'Silver') || plans[1];

    // 3. Seed Users (Admin, Trainers, Members)
    const adminHash = await hashPassword('AdminPassword@2026');
    const trainerHash = await hashPassword('Trainer@2026');
    const memberHash = await hashPassword('Member@2026');

    const adminUser = await User.create({
      name: 'RV Fitness Administrator',
      email: 'admin@rvfitness.local',
      password: adminHash,
      phone: '+91 98765 00001',
      role: 'admin',
    });

    const trainerUser1 = await User.create({
      name: 'Vikram Shinde',
      email: 'vikram@rvfitness.local',
      password: trainerHash,
      phone: '+91 98765 00002',
      role: 'trainer',
    });

    const trainerUser2 = await User.create({
      name: 'Pooja Kulkarni',
      email: 'pooja@rvfitness.local',
      password: trainerHash,
      phone: '+91 98765 00003',
      role: 'trainer',
    });

    const memberUser1 = await User.create({
      name: 'Sarth Patil',
      email: 'sarth@rvfitness.local',
      password: memberHash,
      phone: '+91 98765 43210',
      role: 'member',
      membership: {
        planId: goldPlan._id,
        startDate: new Date(),
        expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
        status: 'active',
      },
    });

    const memberUser2 = await User.create({
      name: 'Rohan Kadam',
      email: 'rohan@rvfitness.local',
      password: memberHash,
      phone: '+91 98765 43211',
      role: 'member',
      membership: {
        planId: silverPlan._id,
        startDate: new Date(),
        expiryDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 3 months
        status: 'active',
      },
    });

    // 4. Seed Trainers Collection
    await Trainer.insertMany([
      {
        name: 'Vikram Shinde',
        specialization: 'Head Strength & Bodybuilding Coach',
        experienceYears: 9,
        certifications: ['ISSA Certified Elite Trainer', 'Certified Strength Specialist (CSCS)', 'Sports Nutrition Diploma'],
        rating: 5.0,
        availability: {
          days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          slots: ['6:00 AM - 11:30 AM', '5:00 PM - 9:30 PM'],
        },
        bio: 'Former state-level natural bodybuilding medalist specializing in hypertrophy periodization, posture biomechanics, and personalized competition preparation.',
        photoUrl: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=800&q=80',
      },
      {
        name: 'Pooja Kulkarni',
        specialization: 'Functional Mobility & Women\'s Physique',
        experienceYears: 6,
        certifications: ['ACE Certified Personal Trainer', 'CrossFit Level 2 Coach', 'Prenatal & Postnatal Fitness'],
        rating: 4.9,
        availability: {
          days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
          slots: ['6:30 AM - 10:30 AM', '4:30 PM - 8:00 PM'],
        },
        bio: 'Dedicated to empowering members through functional conditioning, sustainable fat reduction, and mobility restoration.',
        photoUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80',
      },
      {
        name: 'Rahul Patil',
        specialization: 'High Intensity Conditioning & Calisthenics',
        experienceYears: 7,
        certifications: ['K11 Academy of Fitness Sciences', 'TRX Suspension Master', 'CPR / First Aid Certified'],
        rating: 4.9,
        availability: {
          days: ['Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          slots: ['7:00 AM - 12:00 PM', '5:30 PM - 10:00 PM'],
        },
        bio: 'Passionate about athletic explosive power, high-intensity interval conditioning, and bodyweight mastery.',
        photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
      },
    ]);

    // 5. Seed Equipment Collection
    await Equipment.insertMany([
      {
        name: 'Olympic Power Cage & Rig',
        category: 'Free Weights',
        description: 'Heavy gauge steel commercial rack for heavy squats, bench presses, and overhead work.',
        imageUrl: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=900&q=80',
        musclesWorked: ['Quadriceps', 'Hamstrings', 'Glutes', 'Core', 'Traps'],
        howToUse: [
          'Set J-hooks to armpit height and align safety spotter pins below deepest repetition point.',
          'Step under barbell, engage scapular retraction, and lift cleanly off hooks.',
          'Descend under control until thighs break parallel, then drive forcefully through heels.',
        ],
        benefits: [
          'Maximum compound mechanical overload for systemic hormone release and raw strength.',
          'Guaranteed safety with calibrated industrial drop pins.',
        ],
        safetyTips: ['Always lock collars on both sleeves.', 'Never compromise spinal neutrality for heavier load.'],
        recommendedSetsReps: '4 sets of 5-8 reps with 2-3 mins rest',
        status: 'available',
      },
      {
        name: 'Biomechanical ISO Lateral Chest Press',
        category: 'Strength',
        description: 'Converging axis plate-loaded press simulating natural chest contraction with zero shoulder impingement.',
        imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=80',
        musclesWorked: ['Pectoralis Major', 'Anterior Deltoids', 'Triceps Brachii'],
        howToUse: [
          'Adjust seat height so handles align with mid-chest sternum.',
          'Plant feet firmly, retract shoulder blades against pad, and press forward.',
          'Squeeze chest at peak contraction without locking elbows.',
        ],
        benefits: [
          'Independent arm movement balances muscle asymmetries.',
          'Converging angle targets sternal pectoral fibers with intense contraction.',
        ],
        safetyTips: ['Do not let handles bounce off bottom stoppers.'],
        recommendedSetsReps: '3-4 sets of 8-12 reps with 90s rest',
        status: 'available',
      },
      {
        name: 'Commercial Curve Woodway Treadmill',
        category: 'Cardio',
        description: 'Motorless curved slat belt driven entirely by athletic stride, burning 30% more calories.',
        imageUrl: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&w=900&q=80',
        musclesWorked: ['Cardiovascular System', 'Hamstrings', 'Glutes', 'Calves'],
        howToUse: [
          'Step onto center curve and establish rhythm by striding forward.',
          'Speed increases as you shift foot strike toward the front curve.',
          'To decelerate, gradually taper foot strikes back to the low middle groove.',
        ],
        benefits: ['Promotes natural mid-foot impact.', 'Simulates real outdoor sprint resistance.'],
        safetyTips: ['Hold handrails when first stepping on.'],
        recommendedSetsReps: 'Interval sprints: 20s sprint / 40s walk for 12 rounds',
        status: 'available',
      },
    ]);

    // 6. Seed Events Collection
    await Event.insertMany([
      {
        title: 'Narsobawadi Heavy Deadlift & Bench Championship',
        description: 'The premier annual powerlifting showdown in the region. Sanctioned raw lifting division with calibrated steel plates, referee judging, and cash prizes.',
        date: new Date('2026-11-15T09:00:00Z'),
        location: 'RV Fitness Functional Arena',
        coverImage: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?auto=format&fit=crop&w=1000&q=80',
        seatLimit: 50,
        registeredUsers: [memberUser1._id],
        isFeatured: true,
        status: 'upcoming',
      },
      {
        title: 'CrossFit Sprint & Sled Endurance Gauntlet',
        description: 'High-octane athletic team challenge testing work capacity, sled pushes, kettlebell snatches, and tactical assault bike pacing.',
        date: new Date('2026-11-28T06:30:00Z'),
        location: 'RV Fitness 25m Sprint Turf',
        coverImage: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=1000&q=80',
        seatLimit: 30,
        registeredUsers: [memberUser2._id],
        isFeatured: false,
        status: 'upcoming',
      },
    ]);

    // 7. Seed Gallery Posts Collection
    await GalleryPost.insertMany([
      {
        authorId: trainerUser1._id,
        authorName: 'Vikram Shinde',
        authorRole: 'trainer',
        caption: 'Heavy squat day with the morning crew! Focus on hip abduction, bracing the core, and progressive overload.',
        category: 'Workouts',
        mediaUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1000&q=80',
        mediaType: 'image',
        likes: [memberUser1._id, memberUser2._id],
        comments: [
          {
            userId: memberUser1._id,
            userName: 'Sarth Patil',
            userRole: 'member',
            comment: 'Best leg session in Narsobawadi 🔥',
            createdAt: new Date(),
          },
        ],
      },
      {
        authorId: adminUser._id,
        authorName: 'RV Fitness Admin',
        authorRole: 'admin',
        caption: 'The newly upgraded competition power racks are calibrated and ready for heavy lifting.',
        category: 'Facility',
        mediaUrl: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1000&q=80',
        mediaType: 'image',
        likes: [memberUser1._id],
        comments: [],
      },
    ]);

    // 8. Seed Transformation Stories Collection
    await TransformationStory.insertMany([
      {
        slug: 'amit-deshmukh',
        memberName: 'Amit Deshmukh',
        memberInitials: 'AD',
        memberSince: 'January 2026',
        programTitle: 'Metabolic Recomposition Protocol',
        resultBadge: '-16 kg Fat Loss',
        quote: 'RV Fitness taught me that discipline is a daily choice. I lost 16kg and gained confidence I never knew existed.',
        beforeImageUrl: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80',
        afterImageUrl: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80',
        durationMonths: 5,
        stats: {
          weightLossKg: 16,
          muscleGainKg: 3.5,
          bodyFatReducedPercent: 15,
        },
        approach: {
          workout: '4-day Upper/Lower progressive overload with 15 mins post-workout incline walks.',
          nutrition: 'Moderate caloric deficit with 1.8g protein per kg bodyweight and high hydration.',
        },
        guidedByTrainer: 'Vikram Shinde',
        fullTestimonial: 'Amit arrived at RV Fitness feeling low on energy. Coach Vikram customized a periodized compound lifting protocol that completely transformed his body composition and posture.',
        milestones: [
          { month: 1, title: 'Habit Foundations', description: 'Established 4 workout sessions weekly.' },
          { month: 3, title: 'Significant Fat Reduction', description: 'Lost 9kg; back pain completely resolved.' },
          { month: 5, title: 'Peak Muscular Conditioning', description: 'Visible six-pack and benchmark deadlift PR.' },
        ],
        isPublished: true,
      },
    ]);

    // 9. Seed Sample Enquiry
    await Enquiry.create({
      name: 'Rajesh Shinde',
      phone: '+91 98220 12345',
      email: 'rajesh@example.com',
      interest: 'membership',
      message: 'Looking to join with an annual Gold VIP pass for two family members.',
      status: 'new',
    });

    return NextResponse.json({
      success: true,
      message: 'Local MongoDB database successfully seeded with initial test data!',
      credentials: {
        admin: { email: 'admin@rvfitness.local', password: 'AdminPassword@2026' },
        trainer: { email: 'vikram@rvfitness.local', password: 'Trainer@2026' },
        member: { email: 'sarth@rvfitness.local', password: 'Member@2026' },
      },
      counts: {
        users: 5,
        plans: plans.length,
        trainers: 3,
        equipment: 3,
        events: 2,
        galleryPosts: 2,
        transformations: 1,
        enquiries: 1,
      },
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Seed error:', err);
    return NextResponse.json(
      { error: err.message || 'Database seed failed.' },
      { status: 500 }
    );
  }
}
