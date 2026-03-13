
export interface AtomData {
  element: string;
  position: [number, number, number];
  color: number;
  radius: number;
}

export interface BondData {
  start: [number, number, number];
  end: [number, number, number];
  order: number; // 1, 2, 3
}

export interface MoleculeData {
  atoms: AtomData[];
  bonds: BondData[];
}

const COLORS = {
  C: 0x333333,
  H: 0xffffff,
  O: 0xff0000,
  N: 0x0000ff
};

const RADII = {
  C: 0.4,
  H: 0.25,
  O: 0.38,
  N: 0.38
};

// Hardcoded geometries for representative molecules
const MOLECULES: Record<string, MoleculeData> = {
  // Ethane (C2H6) - Tetrahedral
  alkane: {
    atoms: [
      { element: 'C', position: [-0.7, 0, 0], color: COLORS.C, radius: RADII.C },
      { element: 'C', position: [0.7, 0, 0], color: COLORS.C, radius: RADII.C },
      { element: 'H', position: [-1.1, 0.9, 0], color: COLORS.H, radius: RADII.H },
      { element: 'H', position: [-1.1, -0.45, 0.78], color: COLORS.H, radius: RADII.H },
      { element: 'H', position: [-1.1, -0.45, -0.78], color: COLORS.H, radius: RADII.H },
      { element: 'H', position: [1.1, 0.9, 0], color: COLORS.H, radius: RADII.H },
      { element: 'H', position: [1.1, -0.45, 0.78], color: COLORS.H, radius: RADII.H },
      { element: 'H', position: [1.1, -0.45, -0.78], color: COLORS.H, radius: RADII.H }
    ],
    bonds: [
      { start: [-0.7, 0, 0], end: [0.7, 0, 0], order: 1 },
      { start: [-0.7, 0, 0], end: [-1.1, 0.9, 0], order: 1 },
      { start: [-0.7, 0, 0], end: [-1.1, -0.45, 0.78], order: 1 },
      { start: [-0.7, 0, 0], end: [-1.1, -0.45, -0.78], order: 1 },
      { start: [0.7, 0, 0], end: [1.1, 0.9, 0], order: 1 },
      { start: [0.7, 0, 0], end: [1.1, -0.45, 0.78], order: 1 },
      { start: [0.7, 0, 0], end: [1.1, -0.45, -0.78], order: 1 }
    ]
  },
  // Ethene (C2H4) - Planar - Fixed Double Bond
  alkene: {
    atoms: [
      { element: 'C', position: [-0.67, 0, 0], color: COLORS.C, radius: RADII.C },
      { element: 'C', position: [0.67, 0, 0], color: COLORS.C, radius: RADII.C },
      { element: 'H', position: [-1.2, 0.92, 0], color: COLORS.H, radius: RADII.H },
      { element: 'H', position: [-1.2, -0.92, 0], color: COLORS.H, radius: RADII.H },
      { element: 'H', position: [1.2, 0.92, 0], color: COLORS.H, radius: RADII.H },
      { element: 'H', position: [1.2, -0.92, 0], color: COLORS.H, radius: RADII.H }
    ],
    bonds: [
      { start: [-0.67, 0, 0], end: [0.67, 0, 0], order: 2 },
      { start: [-0.67, 0, 0], end: [-1.2, 0.92, 0], order: 1 },
      { start: [-0.67, 0, 0], end: [-1.2, -0.92, 0], order: 1 },
      { start: [0.67, 0, 0], end: [1.2, 0.92, 0], order: 1 },
      { start: [0.67, 0, 0], end: [1.2, -0.92, 0], order: 1 }
    ]
  },
  // Ethyne (C2H2) - Linear - Fixed Triple Bond
  alkyne: {
    atoms: [
      { element: 'C', position: [-0.6, 0, 0], color: COLORS.C, radius: RADII.C },
      { element: 'C', position: [0.6, 0, 0], color: COLORS.C, radius: RADII.C },
      { element: 'H', position: [-1.66, 0, 0], color: COLORS.H, radius: RADII.H },
      { element: 'H', position: [1.66, 0, 0], color: COLORS.H, radius: RADII.H }
    ],
    bonds: [
      { start: [-0.6, 0, 0], end: [0.6, 0, 0], order: 3 },
      { start: [-0.6, 0, 0], end: [-1.66, 0, 0], order: 1 },
      { start: [0.6, 0, 0], end: [1.66, 0, 0], order: 1 }
    ]
  },
  // Methanol (CH3OH)
  alcohol: {
    atoms: [
      { element: 'C', position: [-0.5, 0, 0], color: COLORS.C, radius: RADII.C },
      // C-O length ~1.43A. Let's align O along x-axis for easier calculation
      { element: 'O', position: [0.93, 0, 0], color: COLORS.O, radius: RADII.O },
      // O-H length ~0.96A, C-O-H angle ~109 deg (sp3 O)
      // O at (0.93, 0, 0), C at (-0.5, 0, 0). Vector C->O is (1.43, 0, 0)
      // H should be at 109 deg to C-O vector.
      // angle 180 - 109 = 71 deg from x-axis.
      // x = 0.93 + 0.96 * cos(71) = 0.93 + 0.31 = 1.24
      // y = 0.96 * sin(71) = 0.91
      { element: 'H', position: [1.24, 0.91, 0], color: COLORS.H, radius: RADII.H },
      
      // Methyl H (Tetrahedral around C at -0.5, 0, 0)
      { element: 'H', position: [-0.9, 0.9, 0], color: COLORS.H, radius: RADII.H },
      { element: 'H', position: [-0.9, -0.45, 0.78], color: COLORS.H, radius: RADII.H },
      { element: 'H', position: [-0.9, -0.45, -0.78], color: COLORS.H, radius: RADII.H }
    ],
    bonds: [
      { start: [-0.5, 0, 0], end: [0.93, 0, 0], order: 1 },
      { start: [0.93, 0, 0], end: [1.24, 0.91, 0], order: 1 },
      { start: [-0.5, 0, 0], end: [-0.9, 0.9, 0], order: 1 },
      { start: [-0.5, 0, 0], end: [-0.9, -0.45, 0.78], order: 1 },
      { start: [-0.5, 0, 0], end: [-0.9, -0.45, -0.78], order: 1 }
    ]
  },
  // Formaldehyde (CH2O)
  aldehyde: {
    atoms: [
      { element: 'C', position: [0, 0, 0], color: COLORS.C, radius: RADII.C },
      { element: 'O', position: [1.22, 0, 0], color: COLORS.O, radius: RADII.O },
      { element: 'H', position: [-0.6, 0.94, 0], color: COLORS.H, radius: RADII.H },
      { element: 'H', position: [-0.6, -0.94, 0], color: COLORS.H, radius: RADII.H }
    ],
    bonds: [
      { start: [0, 0, 0], end: [1.22, 0, 0], order: 2 },
      { start: [0, 0, 0], end: [-0.6, 0.94, 0], order: 1 },
      { start: [0, 0, 0], end: [-0.6, -0.94, 0], order: 1 }
    ]
  },
  // Acetone (CH3COCH3) - sp2 Carbonyl C (trigonal planar), sp3 Methyl C (Tetrahedral)
  ketone: {
    atoms: [
      { element: 'C', position: [0, 0, 0], color: COLORS.C, radius: RADII.C }, // Carbonyl C
      { element: 'O', position: [0, 1.22, 0], color: COLORS.O, radius: RADII.O }, // Carbonyl O
      
      // Methyl 1 at -120 deg
      { element: 'C', position: [-1.3, -0.75, 0], color: COLORS.C, radius: RADII.C },
      // Methyl 2 at +120 deg
      { element: 'C', position: [1.3, -0.75, 0], color: COLORS.C, radius: RADII.C },
      
      // Methyl 1 H (Tetrahedral around -1.3, -0.75, 0)
      // C-C bond direction (-1.3, -0.75, 0) -> angle 210 deg
      { element: 'H', position: [-1.3, -1.8, 0], color: COLORS.H, radius: RADII.H },
      { element: 'H', position: [-1.9, -0.4, 0.89], color: COLORS.H, radius: RADII.H },
      { element: 'H', position: [-1.9, -0.4, -0.89], color: COLORS.H, radius: RADII.H },
      
      // Methyl 2 H (Tetrahedral around 1.3, -0.75, 0)
      // C-C bond direction (1.3, -0.75, 0) -> angle 330 deg
      { element: 'H', position: [1.3, -1.8, 0], color: COLORS.H, radius: RADII.H },
      { element: 'H', position: [1.9, -0.4, 0.89], color: COLORS.H, radius: RADII.H },
      { element: 'H', position: [1.9, -0.4, -0.89], color: COLORS.H, radius: RADII.H }
    ],
    bonds: [
      { start: [0, 0, 0], end: [0, 1.22, 0], order: 2 },
      { start: [0, 0, 0], end: [-1.3, -0.75, 0], order: 1 },
      { start: [0, 0, 0], end: [1.3, -0.75, 0], order: 1 },
      { start: [-1.3, -0.75, 0], end: [-1.3, -1.8, 0], order: 1 },
      { start: [-1.3, -0.75, 0], end: [-1.9, -0.4, 0.89], order: 1 },
      { start: [-1.3, -0.75, 0], end: [-1.9, -0.4, -0.89], order: 1 },
      { start: [1.3, -0.75, 0], end: [1.3, -1.8, 0], order: 1 },
      { start: [1.3, -0.75, 0], end: [1.9, -0.4, 0.89], order: 1 },
      { start: [1.3, -0.75, 0], end: [1.9, -0.4, -0.89], order: 1 }
    ]
  },
  // Dimethyl Ether (CH3OCH3) - sp3 C-O-C angle approx 112 deg
  ether: {
    atoms: [
      { element: 'O', position: [0, 0.5, 0], color: COLORS.O, radius: RADII.O },
      // C-O length ~1.43. O-C-O angle ~112 deg
      // Left C: angle 236 deg (-124 deg from vertical up) -> (-0.8, -1.2) approx
      // Right C: angle 124 deg -> (0.8, -1.2) approx
      
      { element: 'C', position: [-1.18, -0.2, 0], color: COLORS.C, radius: RADII.C },
      { element: 'C', position: [1.18, -0.2, 0], color: COLORS.C, radius: RADII.C },
      
      // Left Methyl H (Tetrahedral around -1.18, -0.2, 0)
      { element: 'H', position: [-1.18, -1.27, 0], color: COLORS.H, radius: RADII.H },
      { element: 'H', position: [-1.7, 0.15, 0.89], color: COLORS.H, radius: RADII.H },
      { element: 'H', position: [-1.7, 0.15, -0.89], color: COLORS.H, radius: RADII.H },
      
      // Right Methyl H (Tetrahedral around 1.18, -0.2, 0)
      { element: 'H', position: [1.18, -1.27, 0], color: COLORS.H, radius: RADII.H },
      { element: 'H', position: [1.7, 0.15, 0.89], color: COLORS.H, radius: RADII.H },
      { element: 'H', position: [1.7, 0.15, -0.89], color: COLORS.H, radius: RADII.H }
    ],
    bonds: [
      { start: [0, 0.5, 0], end: [-1.18, -0.2, 0], order: 1 },
      { start: [0, 0.5, 0], end: [1.18, -0.2, 0], order: 1 },
      { start: [-1.18, -0.2, 0], end: [-1.18, -1.27, 0], order: 1 },
      { start: [-1.18, -0.2, 0], end: [-1.7, 0.15, 0.89], order: 1 },
      { start: [-1.18, -0.2, 0], end: [-1.7, 0.15, -0.89], order: 1 },
      { start: [1.18, -0.2, 0], end: [1.18, -1.27, 0], order: 1 },
      { start: [1.18, -0.2, 0], end: [1.7, 0.15, 0.89], order: 1 },
      { start: [1.18, -0.2, 0], end: [1.7, 0.15, -0.89], order: 1 }
    ]
  },
  // Methyl Acetate (CH3COOCH3) - Ester - sp2 Carbonyl C, sp3 Ether O, sp3 Methyl C
  ester: {
    atoms: [
      { element: 'C', position: [-0.5, 0, 0], color: COLORS.C, radius: RADII.C }, // Carbonyl C
      { element: 'O', position: [-0.5, 1.22, 0], color: COLORS.O, radius: RADII.O }, // Carbonyl O
      
      // Ether O at angle 120 (trigonal planar around C=O)
      // Vector (1.2, -0.6) approx.
      // O-C-O angle in ester is usually 123-125 deg. C-C-O angle 110.
      // Let's place O at [0.7, -0.6, 0] approx (original was ok).
      // Ether O is sp2-like due to resonance, planar C-O-C angle ~115 deg.
      // C-O-C: Carbonyl C -> Ether O -> Methyl C
      // Methyl C position: relative to Ether O [0.7, -0.6, 0]
      // Vector O->C should be at 115 deg to C->O vector.
      // C->O is (1.2, -0.6). Angle -26 deg.
      // Methyl C angle: -26 + 115 = 89 deg? Or -26 - 115 = -141 deg.
      // Trans conformation is most stable (Z-shape).
      // Methyl C at [2.0, -0.2, 0] approx.
      
      { element: 'O', position: [0.7, -0.6, 0], color: COLORS.O, radius: RADII.O }, // Ether O
      { element: 'C', position: [2.0, -0.2, 0], color: COLORS.C, radius: RADII.C }, // Right Methyl C
      
      // Left Methyl C (attached to Carbonyl C)
      { element: 'C', position: [-1.8, -0.6, 0], color: COLORS.C, radius: RADII.C }, // Left Methyl C
      
      // Left Methyl H (Tetrahedral around -1.8, -0.6, 0)
      { element: 'H', position: [-1.8, -1.67, 0], color: COLORS.H, radius: RADII.H },
      { element: 'H', position: [-2.3, -0.25, 0.89], color: COLORS.H, radius: RADII.H },
      { element: 'H', position: [-2.3, -0.25, -0.89], color: COLORS.H, radius: RADII.H },
      
      // Right Methyl H (Tetrahedral around 2.0, -0.2, 0)
      { element: 'H', position: [2.0, 0.87, 0], color: COLORS.H, radius: RADII.H },
      { element: 'H', position: [2.5, -0.55, 0.89], color: COLORS.H, radius: RADII.H },
      { element: 'H', position: [2.5, -0.55, -0.89], color: COLORS.H, radius: RADII.H }
    ],
    bonds: [
      { start: [-0.5, 0, 0], end: [-0.5, 1.22, 0], order: 2 },
      { start: [-0.5, 0, 0], end: [0.7, -0.6, 0], order: 1 },
      { start: [-0.5, 0, 0], end: [-1.8, -0.6, 0], order: 1 },
      { start: [0.7, -0.6, 0], end: [2.0, -0.2, 0], order: 1 },
      { start: [-1.8, -0.6, 0], end: [-1.8, -1.67, 0], order: 1 },
      { start: [-1.8, -0.6, 0], end: [-2.3, -0.25, 0.89], order: 1 },
      { start: [-1.8, -0.6, 0], end: [-2.3, -0.25, -0.89], order: 1 },
      { start: [2.0, -0.2, 0], end: [2.0, 0.87, 0], order: 1 },
      { start: [2.0, -0.2, 0], end: [2.5, -0.55, 0.89], order: 1 },
      { start: [2.0, -0.2, 0], end: [2.5, -0.55, -0.89], order: 1 }
    ]
  },
  phenol: {
    atoms: [
      { element: 'C', position: [1.2, 0, 0], color: COLORS.C, radius: RADII.C },
      { element: 'C', position: [0.6, 1.04, 0], color: COLORS.C, radius: RADII.C },
      { element: 'C', position: [-0.6, 1.04, 0], color: COLORS.C, radius: RADII.C },
      { element: 'C', position: [-1.2, 0, 0], color: COLORS.C, radius: RADII.C },
      { element: 'C', position: [-0.6, -1.04, 0], color: COLORS.C, radius: RADII.C },
      { element: 'C', position: [0.6, -1.04, 0], color: COLORS.C, radius: RADII.C },
      { element: 'O', position: [2.3, 0, 0], color: COLORS.O, radius: RADII.O },
      { element: 'H', position: [2.8, 0.7, 0], color: COLORS.H, radius: RADII.H }, // Adjusted H angle
      { element: 'H', position: [1.0, 1.85, 0], color: COLORS.H, radius: RADII.H },
      { element: 'H', position: [-1.0, 1.85, 0], color: COLORS.H, radius: RADII.H },
      { element: 'H', position: [-2.1, 0, 0], color: COLORS.H, radius: RADII.H },
      { element: 'H', position: [-1.0, -1.85, 0], color: COLORS.H, radius: RADII.H },
      { element: 'H', position: [1.0, -1.85, 0], color: COLORS.H, radius: RADII.H }
    ],
    bonds: [
      { start: [1.2, 0, 0], end: [0.6, 1.04, 0], order: 1 },
      { start: [0.6, 1.04, 0], end: [-0.6, 1.04, 0], order: 2 },
      { start: [-0.6, 1.04, 0], end: [-1.2, 0, 0], order: 1 },
      { start: [-1.2, 0, 0], end: [-0.6, -1.04, 0], order: 2 },
      { start: [-0.6, -1.04, 0], end: [0.6, -1.04, 0], order: 1 },
      { start: [0.6, -1.04, 0], end: [1.2, 0, 0], order: 2 }, // Ensured 3 double bonds
      { start: [1.2, 0, 0], end: [2.3, 0, 0], order: 1 },
      { start: [2.3, 0, 0], end: [2.8, 0.7, 0], order: 1 },
      { start: [0.6, 1.04, 0], end: [1.0, 1.85, 0], order: 1 },
      { start: [-0.6, 1.04, 0], end: [-1.0, 1.85, 0], order: 1 },
      { start: [-1.2, 0, 0], end: [-2.1, 0, 0], order: 1 },
      { start: [-0.6, -1.04, 0], end: [-1.0, -1.85, 0], order: 1 },
      { start: [0.6, -1.04, 0], end: [1.0, -1.85, 0], order: 1 }
    ]
  },
  // Acetic Acid (CH3COOH) - sp2 Carbonyl C (trigonal planar), sp3 Methyl C
  'carboxylic-acid': {
    atoms: [
      { element: 'C', position: [0, 0, 0], color: COLORS.C, radius: RADII.C }, // Carbonyl C
      // sp2 geometry: 120 degree angles roughly
      // C=O at 0 deg, C-OH at 120 deg, C-C at 240 deg
      // Let's align C=O up (90), C-OH down-right (-30), C-C down-left (210)
      // Actually keeping current alignment but fixing angles:
      // C=O at (1.2, 0.4) -> angle ~18 deg
      // C-OH at (-0.6, -1.0) -> angle ~240 deg
      // C-C at (-1.4, 0.6) -> angle ~156 deg
      // Let's enforce standard trigonal planar:
      // C=O: (1.2, 0, 0)
      // C-OH: (-0.6, -1.04, 0) -> cos(60)=0.5, sin(60)=0.866. 1.2*0.5=0.6, 1.2*0.866=1.04. Correct.
      // C-C: (-0.6, 1.04, 0) -> Correct.
      
      // Re-doing coordinates for perfect 120 deg planar:
      // Center C: (0,0,0)
      // O (Double): (1.22, 0, 0)
      // O (Single): (-0.61, -1.06, 0)
      // C (Methyl): (-0.61, 1.06, 0)
      
      { element: 'O', position: [1.22, 0, 0], color: COLORS.O, radius: RADII.O }, // Carbonyl O
      { element: 'O', position: [-0.61, -1.06, 0], color: COLORS.O, radius: RADII.O }, // Hydroxyl O
      { element: 'H', position: [-0.2, -1.8, 0], color: COLORS.H, radius: RADII.H }, // Hydroxyl H
      
      { element: 'C', position: [-0.61, 1.06, 0], color: COLORS.C, radius: RADII.C }, // Methyl C
      // Methyl H (Tetrahedral around -0.61, 1.06, 0)
      { element: 'H', position: [-0.1, 1.9, 0], color: COLORS.H, radius: RADII.H },
      { element: 'H', position: [-1.2, 1.3, 0.89], color: COLORS.H, radius: RADII.H },
      { element: 'H', position: [-1.2, 1.3, -0.89], color: COLORS.H, radius: RADII.H }
    ],
    bonds: [
      { start: [0, 0, 0], end: [1.22, 0, 0], order: 2 },
      { start: [0, 0, 0], end: [-0.61, -1.06, 0], order: 1 },
      { start: [-0.61, -1.06, 0], end: [-0.2, -1.8, 0], order: 1 },
      { start: [0, 0, 0], end: [-0.61, 1.06, 0], order: 1 },
      { start: [-0.61, 1.06, 0], end: [-0.1, 1.9, 0], order: 1 },
      { start: [-0.61, 1.06, 0], end: [-1.2, 1.3, 0.89], order: 1 },
      { start: [-0.61, 1.06, 0], end: [-1.2, 1.3, -0.89], order: 1 }
    ]
  },
  // Methylamine (CH3NH2) - sp3 C, pyramidal sp3 N
  amine: {
    atoms: [
      { element: 'N', position: [0.6, 0, 0], color: COLORS.N, radius: RADII.N },
      { element: 'C', position: [-0.8, 0, 0], color: COLORS.C, radius: RADII.C },
      // Amine H (Pyramidal N at 0.6, 0, 0)
      { element: 'H', position: [1.0, 0.7, 0.6], color: COLORS.H, radius: RADII.H },
      { element: 'H', position: [1.0, 0.7, -0.6], color: COLORS.H, radius: RADII.H },
      // Methyl H (Tetrahedral C at -0.8, 0, 0)
      { element: 'H', position: [-1.2, -0.5, 0.8], color: COLORS.H, radius: RADII.H },
      { element: 'H', position: [-1.2, -0.5, -0.8], color: COLORS.H, radius: RADII.H },
      { element: 'H', position: [-1.2, 1.0, 0], color: COLORS.H, radius: RADII.H }
    ],
    bonds: [
      { start: [0.6, 0, 0], end: [-0.8, 0, 0], order: 1 },
      { start: [0.6, 0, 0], end: [1.0, 0.7, 0.6], order: 1 },
      { start: [0.6, 0, 0], end: [1.0, 0.7, -0.6], order: 1 },
      { start: [-0.8, 0, 0], end: [-1.2, -0.5, 0.8], order: 1 },
      { start: [-0.8, 0, 0], end: [-1.2, -0.5, -0.8], order: 1 },
      { start: [-0.8, 0, 0], end: [-1.2, 1.0, 0], order: 1 }
    ]
  },
  // Acetamide (CH3CONH2) - sp2 Carbonyl C (trigonal planar), sp2 N
  amide: {
    atoms: [
      { element: 'C', position: [0, 0, 0], color: COLORS.C, radius: RADII.C }, // Carbonyl C
      // sp2 planar 120 deg:
      // O: (1.22, 0, 0)
      // N: (-0.61, -1.06, 0)
      // C: (-0.61, 1.06, 0)
      
      { element: 'O', position: [1.22, 0, 0], color: COLORS.O, radius: RADII.O }, // Carbonyl O
      { element: 'N', position: [-0.61, -1.06, 0], color: COLORS.N, radius: RADII.N }, // Amide N
      { element: 'C', position: [-0.61, 1.06, 0], color: COLORS.C, radius: RADII.C }, // Methyl C
      
      // Amide H (Planar N at -0.61, -1.06, 0)
      { element: 'H', position: [-0.2, -1.9, 0], color: COLORS.H, radius: RADII.H },
      { element: 'H', position: [-1.6, -1.2, 0], color: COLORS.H, radius: RADII.H },
      
      // Methyl H (Tetrahedral C at -0.61, 1.06, 0)
      { element: 'H', position: [-0.1, 1.9, 0], color: COLORS.H, radius: RADII.H },
      { element: 'H', position: [-1.2, 1.3, 0.89], color: COLORS.H, radius: RADII.H },
      { element: 'H', position: [-1.2, 1.3, -0.89], color: COLORS.H, radius: RADII.H }
    ],
    bonds: [
      { start: [0, 0, 0], end: [1.22, 0, 0], order: 2 },
      { start: [0, 0, 0], end: [-0.61, -1.06, 0], order: 1 }, 
      { start: [-0.61, -1.06, 0], end: [-0.2, -1.9, 0], order: 1 },
      { start: [-0.61, -1.06, 0], end: [-1.6, -1.2, 0], order: 1 },
      { start: [0, 0, 0], end: [-0.61, 1.06, 0], order: 1 },
      { start: [-0.61, 1.06, 0], end: [-0.1, 1.9, 0], order: 1 },
      { start: [-0.61, 1.06, 0], end: [-1.2, 1.3, 0.89], order: 1 },
      { start: [-0.61, 1.06, 0], end: [-1.2, 1.3, -0.89], order: 1 }
    ]
  },
  // --- Basic Roots (基础字根) ---
  hydrocarbon: {
    // Default to Ethane, but logic should handle switching
    atoms: [
      { element: 'C', position: [-0.7, 0, 0], color: COLORS.C, radius: RADII.C },
      { element: 'C', position: [0.7, 0, 0], color: COLORS.C, radius: RADII.C },
      { element: 'H', position: [-1.1, 0.9, 0], color: COLORS.H, radius: RADII.H },
      { element: 'H', position: [-1.1, -0.45, 0.78], color: COLORS.H, radius: RADII.H },
      { element: 'H', position: [-1.1, -0.45, -0.78], color: COLORS.H, radius: RADII.H },
      { element: 'H', position: [1.1, 0.9, 0], color: COLORS.H, radius: RADII.H },
      { element: 'H', position: [1.1, -0.45, 0.78], color: COLORS.H, radius: RADII.H },
      { element: 'H', position: [1.1, -0.45, -0.78], color: COLORS.H, radius: RADII.H }
    ],
    bonds: [
      { start: [-0.7, 0, 0], end: [0.7, 0, 0], order: 1 },
      { start: [-0.7, 0, 0], end: [-1.1, 0.9, 0], order: 1 },
      { start: [-0.7, 0, 0], end: [-1.1, -0.45, 0.78], order: 1 },
      { start: [-0.7, 0, 0], end: [-1.1, -0.45, -0.78], order: 1 },
      { start: [0.7, 0, 0], end: [1.1, 0.9, 0], order: 1 },
      { start: [0.7, 0, 0], end: [1.1, -0.45, 0.78], order: 1 },
      { start: [0.7, 0, 0], end: [1.1, -0.45, -0.78], order: 1 }
    ]
  },
  hydroxyl: {
    // Default to Methanol (Alcohol)
    atoms: [
      { element: 'C', position: [-0.5, 0, 0], color: COLORS.C, radius: RADII.C },
      { element: 'O', position: [0.93, 0, 0], color: COLORS.O, radius: RADII.O },
      { element: 'H', position: [1.24, 0.91, 0], color: COLORS.H, radius: RADII.H },
      { element: 'H', position: [-0.9, 0.9, 0], color: COLORS.H, radius: RADII.H },
      { element: 'H', position: [-0.9, -0.45, 0.78], color: COLORS.H, radius: RADII.H },
      { element: 'H', position: [-0.9, -0.45, -0.78], color: COLORS.H, radius: RADII.H }
    ],
    bonds: [
      { start: [-0.5, 0, 0], end: [0.93, 0, 0], order: 1 },
      { start: [0.93, 0, 0], end: [1.24, 0.91, 0], order: 1 },
      { start: [-0.5, 0, 0], end: [-0.9, 0.9, 0], order: 1 },
      { start: [-0.5, 0, 0], end: [-0.9, -0.45, 0.78], order: 1 },
      { start: [-0.5, 0, 0], end: [-0.9, -0.45, -0.78], order: 1 }
    ]
  },
  carbonyl: {
    // Default to Acetone (Ketone)
    atoms: [
      { element: 'C', position: [0, 0, 0], color: COLORS.C, radius: RADII.C }, // Carbonyl C
      { element: 'O', position: [0, 1.22, 0], color: COLORS.O, radius: RADII.O }, // Carbonyl O
      { element: 'C', position: [-1.3, -0.75, 0], color: COLORS.C, radius: RADII.C },
      { element: 'C', position: [1.3, -0.75, 0], color: COLORS.C, radius: RADII.C },
      { element: 'H', position: [-1.3, -1.8, 0], color: COLORS.H, radius: RADII.H },
      { element: 'H', position: [-1.9, -0.4, 0.89], color: COLORS.H, radius: RADII.H },
      { element: 'H', position: [-1.9, -0.4, -0.89], color: COLORS.H, radius: RADII.H },
      { element: 'H', position: [1.3, -1.8, 0], color: COLORS.H, radius: RADII.H },
      { element: 'H', position: [1.9, -0.4, 0.89], color: COLORS.H, radius: RADII.H },
      { element: 'H', position: [1.9, -0.4, -0.89], color: COLORS.H, radius: RADII.H }
    ],
    bonds: [
      { start: [0, 0, 0], end: [0, 1.22, 0], order: 2 },
      { start: [0, 0, 0], end: [-1.3, -0.75, 0], order: 1 },
      { start: [0, 0, 0], end: [1.3, -0.75, 0], order: 1 },
      { start: [-1.3, -0.75, 0], end: [-1.3, -1.8, 0], order: 1 },
      { start: [-1.3, -0.75, 0], end: [-1.9, -0.4, 0.89], order: 1 },
      { start: [-1.3, -0.75, 0], end: [-1.9, -0.4, -0.89], order: 1 },
      { start: [1.3, -0.75, 0], end: [1.3, -1.8, 0], order: 1 },
      { start: [1.3, -0.75, 0], end: [1.9, -0.4, 0.89], order: 1 },
      { start: [1.3, -0.75, 0], end: [1.9, -0.4, -0.89], order: 1 }
    ]
  },
  // Variants for Hydrocarbon
  benzene: {
    atoms: [
      { element: 'C', position: [1.4, 0, 0], color: COLORS.C, radius: RADII.C },
      { element: 'C', position: [0.7, 1.21, 0], color: COLORS.C, radius: RADII.C },
      { element: 'C', position: [-0.7, 1.21, 0], color: COLORS.C, radius: RADII.C },
      { element: 'C', position: [-1.4, 0, 0], color: COLORS.C, radius: RADII.C },
      { element: 'C', position: [-0.7, -1.21, 0], color: COLORS.C, radius: RADII.C },
      { element: 'C', position: [0.7, -1.21, 0], color: COLORS.C, radius: RADII.C },
      { element: 'H', position: [2.5, 0, 0], color: COLORS.H, radius: RADII.H },
      { element: 'H', position: [1.25, 2.16, 0], color: COLORS.H, radius: RADII.H },
      { element: 'H', position: [-1.25, 2.16, 0], color: COLORS.H, radius: RADII.H },
      { element: 'H', position: [-2.5, 0, 0], color: COLORS.H, radius: RADII.H },
      { element: 'H', position: [-1.25, -2.16, 0], color: COLORS.H, radius: RADII.H },
      { element: 'H', position: [1.25, -2.16, 0], color: COLORS.H, radius: RADII.H }
    ],
    bonds: [
      { start: [1.4, 0, 0], end: [0.7, 1.21, 0], order: 2 },
      { start: [0.7, 1.21, 0], end: [-0.7, 1.21, 0], order: 1 },
      { start: [-0.7, 1.21, 0], end: [-1.4, 0, 0], order: 2 },
      { start: [-1.4, 0, 0], end: [-0.7, -1.21, 0], order: 1 },
      { start: [-0.7, -1.21, 0], end: [0.7, -1.21, 0], order: 2 },
      { start: [0.7, -1.21, 0], end: [1.4, 0, 0], order: 1 },
      { start: [1.4, 0, 0], end: [2.5, 0, 0], order: 1 },
      { start: [0.7, 1.21, 0], end: [1.25, 2.16, 0], order: 1 },
      { start: [-0.7, 1.21, 0], end: [-1.25, 2.16, 0], order: 1 },
      { start: [-1.4, 0, 0], end: [-2.5, 0, 0], order: 1 },
      { start: [-0.7, -1.21, 0], end: [-1.25, -2.16, 0], order: 1 },
      { start: [0.7, -1.21, 0], end: [1.25, -2.16, 0], order: 1 }
    ]
  }
};

export const getMoleculeData = (id: string): MoleculeData => {
  return (MOLECULES[id] || MOLECULES['alkane']) as MoleculeData;
};
