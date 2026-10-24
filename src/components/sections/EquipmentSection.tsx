'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import SectionHeader from '@/components/ui/SectionHeader';
import SpotlightCard from '@/components/ui/SpotlightCard';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { X, Layers, Activity, ShieldAlert, Sparkles, CheckCircle2, RotateCw } from 'lucide-react';

interface EquipmentItem {
  id: string;
  name: string;
  category: 'Cardio' | 'Strength' | 'Free Weights' | 'Functional';
  description: string;
  imageUrl: string;
  musclesWorked: string[];
  howToUse: string[];
  benefits: string[];
  safetyTips: string[];
  recommendedSetsReps: string;
}

export function EquipmentSection() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedMachine, setSelectedMachine] = useState<EquipmentItem | null>(null);
  const [is3DMode, setIs3DMode] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);

  const categories = ['All', 'Cardio', 'Strength', 'Free Weights', 'Functional'] as const;

  const equipmentList: EquipmentItem[] = [
    {
      id: 'eq-1',
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
      safetyTips: [
        'Always lock collars on both sleeves.',
        'Never compromise spinal neutrality for heavier load.',
      ],
      recommendedSetsReps: '4 sets of 5-8 reps with 2-3 mins rest',
    },
    {
      id: 'eq-2',
      name: 'Biomechanical ISO Lateral Chest Press',
      category: 'Strength',
      description: 'Converging axis plate-loaded press simulating natural chest contraction with zero shoulder impingement.',
      imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=80',
      musclesWorked: ['Pectoralis Major', 'Anterior Deltoids', 'Triceps Brachii'],
      howToUse: [
        'Adjust pneumatic seat height so handles align with mid-chest sternum.',
        'Plant feet firmly, retract shoulder blades against back pad, and press smoothly forward.',
        'Squeeze chest at peak contraction without hyperextending elbows, then return in 3 seconds.',
      ],
      benefits: [
        'Independent arm movements prevent dominant side compensation and balance physique asymmetry.',
        'Converging angle targets sternal pectoral fibers with intense peak contraction.',
      ],
      safetyTips: [
        'Do not let handles bounce off bottom stoppers.',
        'Keep wrists straight and aligned with forearms.',
      ],
      recommendedSetsReps: '3-4 sets of 8-12 reps with 90s rest',
    },
    {
      id: 'eq-3',
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
      benefits: [
        'Promotes natural mid-foot impact, eliminating heel strike impact on knee joints.',
        'Simulates real outdoor sprint resistance with instantaneous speed modulation.',
      ],
      safetyTips: [
        'Hold handrails when first stepping on until comfortable with self-powered propulsion.',
      ],
      recommendedSetsReps: 'Interval sprints: 20s sprint / 40s walk for 12 rounds',
    },
    {
      id: 'eq-4',
      name: 'Heavy Duty Functional Sled & Sprint Turf',
      category: 'Functional',
      description: 'Prowler sled on 25-meter low-friction sprint turf with dual high and low push handles.',
      imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=900&q=80',
      musclesWorked: ['Posterior Chain', 'Quads', 'Core Stabilizers', 'Shoulders'],
      howToUse: [
        'Grip push posts at comfortable height with arms locked and body at a 45-degree forward lean.',
        'Drive knees forward with powerful triple extension through ankle, knee, and hip.',
        'Maintain continuous forward momentum down the 25m turf strip.',
      ],
      benefits: [
        'Concentric-only resistance produces zero muscle soreness, making it ideal for daily conditioning.',
        'Elevates VO2 max and builds ferocious mental endurance.',
      ],
      safetyTips: [
        'Keep spine locked in neutral alignment—never let lower back round under fatigue.',
      ],
      recommendedSetsReps: '6 pushes of 25 meters with 60 seconds rest',
    },
    {
      id: 'eq-5',
      name: 'Plate-Loaded 45-Degree Leg Press',
      category: 'Strength',
      description: 'Industrial linear bearing sled with 1000kg load capacity and 4-position lockout safety.',
      imageUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=900&q=80',
      musclesWorked: ['Quadriceps', 'Adductors', 'Gluteus Maximus'],
      howToUse: [
        'Sit with lower back and hips firmly pressed against pad; place feet shoulder-width apart on platform.',
        'Disengage safety levers by rotating handles outwards.',
        'Lower sled slowly until knees reach 90 degrees, then press platform without locking knees.',
      ],
      benefits: [
        'Allows immense leg hypertrophy loading without spinal axial compression.',
        'Multi-angle foot positions target inner, outer, or posterior thigh musculature.',
      ],
      safetyTips: [
        'NEVER lock knees at the top of repetition.',
        'Keep tailbone pinned to the seat back throughout the stroke.',
      ],
      recommendedSetsReps: '4 sets of 10-15 reps with 2 mins rest',
    },
    {
      id: 'eq-6',
      name: 'Solid Cast Urethane Dumbbell Suite',
      category: 'Free Weights',
      description: 'Commercial grade urethane dumbbells ranging from 2.5 kg to 50 kg in precision 2.5 kg increments.',
      imageUrl: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=900&q=80',
      musclesWorked: ['Full Body Compound & Isolation Chains'],
      howToUse: [
        'Select appropriate weight based on target repetition bracket.',
        'Use ergonomic knurled stainless steel handle for secure non-slip grip.',
        'Execute controlled eccentric and concentric phases without swinging momentum.',
      ],
      benefits: [
        'Unrivaled freedom of motion for natural joint articulation and stabilizer activation.',
        'Heavy-duty urethane heads protect equipment and minimize noise.',
      ],
      safetyTips: [
        'Always re-rack dumbbells on designated numerical cradle saddles.',
      ],
      recommendedSetsReps: 'Varies by target muscle group (8-15 reps)',
    },
  ];

  const filteredEquipment =
    activeCategory === 'All'
      ? equipmentList
      : equipmentList.filter((item) => item.category === activeCategory);

  // Lock body scroll when modal is active per Section 4.4
  useEffect(() => {
    if (selectedMachine) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setSelectedMachine(null);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'unset';
      };
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedMachine]);

  return (
    <section id="equipment" className="py-24 relative overflow-hidden bg-[#080808]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        <SectionHeader
          eyebrow="Engineered For Champions"
          title="State Of The Art Equipment"
          highlightWord="Equipment"
          description="Every machine at RV Fitness has been selected for biomechanical leverage, smooth resistance profiles, and heavy commercial durability."
        />

        {/* Category Filter Tabs per Section 4.4 */}
        <div className="flex flex-wrap items-center gap-2 border-b border-zinc-800 pb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#FFC62A] text-black shadow-[0_0_20px_rgba(255,198,42,0.4)]'
                  : 'bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Equipment Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEquipment.map((machine) => (
            <SpotlightCard
              key={machine.id}
              onClick={() => setSelectedMachine(machine)}
              className="p-0 bg-zinc-950/80 border-zinc-800/90 overflow-hidden cursor-pointer group flex flex-col justify-between"
            >
              {/* Machine Image */}
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <Image
                  src={machine.imageUrl}
                  alt={machine.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3">
                  <Badge variant="gold">{machine.category}</Badge>
                </div>
                <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md text-[10px] font-mono text-[#FFC62A] border border-[#FFC62A]/30">
                  Inspect Machine →
                </div>
              </div>

              {/* Card Meta */}
              <div className="p-5 space-y-2">
                <h3 className="text-lg font-black uppercase text-white group-hover:text-[#FFC62A] transition-colors leading-tight">
                  {machine.name}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2">
                  {machine.description}
                </p>

                <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-400 font-mono">
                  <span>{machine.musclesWorked.slice(0, 2).join(', ')}</span>
                  <span className="text-[#FFC62A]">Details</span>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>

      {/* 75% Screen Click Popup Modal per Section 4.4 */}
      {selectedMachine && (
        <div
          onClick={() => setSelectedMachine(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-black/85 backdrop-blur-lg animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#101010] border border-[#FFC62A]/40 shadow-[0_0_60px_rgba(255,198,42,0.25)] p-6 sm:p-8 lg:p-10"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedMachine(null)}
              className="absolute top-6 right-6 z-20 p-2.5 rounded-full bg-zinc-900 border border-zinc-700 text-zinc-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Media / Interactive 3D Simulation Viewer (lg:col-span-5) */}
              <div className="lg:col-span-5 space-y-4">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-zinc-800 bg-black shadow-2xl flex items-center justify-center">
                  {is3DMode ? (
                    <div className="relative w-full h-full flex flex-col items-center justify-center bg-radial from-amber-400/10 to-zinc-950 p-6 select-none">
                      <div
                        className="transition-transform duration-100 ease-out flex flex-col items-center"
                        style={{ transform: `rotateY(${rotationAngle}deg)` }}
                      >
                        <div className="w-32 h-32 rounded-2xl border-2 border-[#FFC62A] shadow-[0_0_30px_#FFC62A] bg-zinc-900/90 flex flex-col items-center justify-center p-3 text-center">
                          <Layers className="w-10 h-10 text-[#FFC62A] animate-pulse mb-2" />
                          <span className="text-[10px] font-black uppercase text-white tracking-wider">3D Mesh View</span>
                        </div>
                      </div>

                      <div className="absolute bottom-4 flex items-center gap-2">
                        <button
                          onClick={() => setRotationAngle((a) => a - 45)}
                          className="px-3 py-1 rounded bg-zinc-800 text-[10px] text-zinc-300 border border-zinc-700 hover:text-white"
                        >
                          ⟲ Rotate Left
                        </button>
                        <button
                          onClick={() => setRotationAngle((a) => a + 45)}
                          className="px-3 py-1 rounded bg-zinc-800 text-[10px] text-zinc-300 border border-zinc-700 hover:text-white"
                        >
                          Rotate Right ⟳
                        </button>
                      </div>
                    </div>
                  ) : (
                    <Image
                      src={selectedMachine.imageUrl}
                      alt={selectedMachine.name}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>

                {/* 3D Model View Toggle per Section 4.4 */}
                <button
                  onClick={() => setIs3DMode(!is3DMode)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700/80 text-xs font-bold uppercase tracking-wider text-zinc-300 hover:border-[#FFC62A] hover:text-[#FFC62A] transition-all cursor-pointer"
                >
                  <RotateCw className="w-4 h-4" />
                  {is3DMode ? 'Switch to Real HD Photo' : 'Interactive 3D Machine Viewer'}
                </button>
              </div>

              {/* Right Column: In-depth Technical Specs (lg:col-span-7) */}
              <div className="lg:col-span-7 space-y-6">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="gold">{selectedMachine.category}</Badge>
                    <span className="text-xs font-mono text-zinc-400">RV Fitness Certified Rig</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black uppercase text-white">
                    {selectedMachine.name}
                  </h3>
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    {selectedMachine.description}
                  </p>
                </div>

                {/* Muscles Worked */}
                <div className="space-y-2">
                  <span className="text-xs font-black uppercase tracking-wider text-[#FFC62A] flex items-center gap-1.5">
                    <Activity className="w-4 h-4" /> Primary Muscles Engaged
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedMachine.musclesWorked.map((m) => (
                      <span
                        key={m}
                        className="px-3 py-1 rounded-full text-xs font-semibold bg-zinc-900 border border-zinc-700 text-zinc-200"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Step-by-Step Execution Guide */}
                <div className="space-y-2">
                  <span className="text-xs font-black uppercase tracking-wider text-white">
                    How To Use Step-By-Step
                  </span>
                  <div className="space-y-2">
                    {selectedMachine.howToUse.map((step, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                        <span className="w-4 h-4 rounded-full bg-[#FFC62A]/20 text-[#FFC62A] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Benefits & Safety Tips */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800 text-xs">
                  <div className="space-y-1.5">
                    <span className="font-bold uppercase text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Biomechanical Benefits
                    </span>
                    <ul className="list-disc list-inside space-y-1 text-zinc-400 text-[11px]">
                      {selectedMachine.benefits.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-1.5">
                    <span className="font-bold uppercase text-amber-400 flex items-center gap-1">
                      <ShieldAlert className="w-3.5 h-3.5" /> Safety & Technique
                    </span>
                    <ul className="list-disc list-inside space-y-1 text-zinc-400 text-[11px]">
                      {selectedMachine.safetyTips.map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Recommended Sets and Reps */}
                <div className="p-3 rounded-xl bg-amber-400/10 border border-[#FFC62A]/30 flex items-center justify-between text-xs">
                  <span className="font-bold text-[#FFC62A] uppercase">Recommended Loading:</span>
                  <span className="font-mono text-white font-semibold">{selectedMachine.recommendedSetsReps}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default EquipmentSection;
