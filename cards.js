const CARDS = [
  {
    name: "Isolation-Area-AIIR-Exterior",
    number: 7,
    observables: ["Room 1", "Room 2", "Room 3"],
    title: "Isolation: Observation of Area Exterior to Airborne Infection Isolation Rooms",
    instructions: "If there are any patients requiring Airborne Infection Isolation on unit, observe area outside of each isolation room. Observe each practice and record the observation. In the column on the right, sum (across) the total number of “Yes” and the total number of observations (“Yes” + “No”). Sum all categories (down) for overall performance.",
    sections: [{
      header: "Isolation room: Observation Categories",
      choiceSet: ["Yes","No"],
      questions: [
        {text:"Is an Airborne Infection Isolation sign at the patient's door?", choices:["Yes","No"]},
        {text:"Is the door to the room closed?", choices:["Yes","No"]},
        {text:"Does a manometer or other measurement mechanism indicate negative pressure in the room?", choices:["Yes","No"]},
        {text:"Are appropriate respirators}, (N-95) in multiple sizes and/or charged, powered air purifying respirators (PAPR), available?", choices:["Yes","No"]},
        {text:"Are respirators stored outside the room or in an anteroom?", choices:["Yes","No"]},
      ]
    }]
  },
  {
    name: "Isolation-Area-Contact-Isolation-Exterior",
    number: 6,
    observables: ["Room 1", "Room 2", "Room 3"],
    title: "Isolation: Observation of Area Exterior to Contact Isolation Rooms",
    instructions: "Instructions: Observe areas outside of isolation rooms. Observe each practice and record the observation. In the column on the right, sum (across) the total number of “Yes” and the total number of observations (“Yes” + “No”). Sum all categories (down) for overall performance. Disregard not applicable categories. For example, cover gowns should be outside contact precautions rooms, but may not be required outside a room with airborne isolation precautions only.",
    sections: [{
      header: "Isolation room: Observation Categories",
      choiceSet: ["Yes","No","N/A"],
      questions: [
        {text:"Is an isolation sign at the patient’s door?", choices:["Yes","No"]},
        {text:"Are gloves available outside of each patient room or treatment area?", choices:["Yes","No","N/A"]},
        {text:"Are cover gowns available near each patient room or treatment area?", choices:["Yes","No"]},
        {text:"Is other PPE for standard precautions (e.g., eye protection, face masks) available near each patient room or treatment area?", choices:["Yes","No","N/A"]},
        {text:"Are surgical face masks or face shields or N95 respirators available near patient room?", choices:["Yes","No","N/A"]},
        {text:"Is dedicated patient equipment, such as stethoscopes or blood pressure cuffs, available?", choices:["Yes","No"]},
      ],
    }],
  },
  {
    name: "Central-Venous-Catheter-Observation",
    number: 1,
    observables: ["Patient 1", "Patient 2", "Patient 3", "Patient 4"],
    title: "Central Venous Catheter: Observation",
    instructions: "Observe patients with central lines in place. Observe each practice and record the observation. In the column on the right, sum (across) the total number of “Yes” and the total number of observations (“Yes” + “No”). Sum all categories (down) for overall performance.",
    sections: [{
    header: "Central catheter: Observation Categories",
      choiceSet: ["Yes","No","N/A"],
    questions: [
      {text:"Is the dressing adhesive intact over the catheter insertion site and drainage contained? (This question is for all dressings, including chlorhexidine gluconate -CHG dressings)", choices:["Yes","No"]},
      {text:"Is the dressing dated and timed according to facility policy?", choices:["Yes","No"]},
      {text:"Is the catheter secured to reduce movement or tension?", choices:["Yes","No"]},
      {text:"Are the administration tubing sets labeled with the start date and time?", choices:["Yes","No"]},
      {text:"If the tubing set is labeled, is it within the specified date and time range for use?", choices:["Yes","No","N/A"]},
      {text:"Are all inactive ports capped according to facility policy?", choices:["Yes","No","N/A"]},
    ],
    }],
  },
  {
    name: "Injection-Safety-Central-Med-Area",
    number: 10,
    observables: ["One"],
    title: "Injection Safety: Observation of Centralized Medication Area",
    instructions: "Observe medication preparation area. For each category, record the observation. Observe each practice below and answer Yes, No, or N/A. Sum all Yes and No responses. Divide by sum of “Yes”+”No”. Disregard not applicable categories.",
    sections: [{
    header: "Medication preparation room: Observation Categories",
    choiceSet: ["Yes","No","N/A"],
    questions: [
      {text:"If multi-dose injectable medications are present, is the medication container maintained in a dedicated medication preparation space?", choices:["Yes","No","N/A"]},
      {text:"Is the medication preparation area free of opened single dose vials or opened single use containers?", choices:["Yes","No"]},
      {text:"If open multi-dose vials are present, are they dated and within the Beyond Use Date (BUD) and the manufacturer’s expiration period?", choices:["Yes","No","N/A"]},
      {text:"Medications are prepared in a clean area free from contamination or contact with blood, body fluids, or contaminated equipment.", choices:["Yes","No"]},
      {text:"Are splash guards installed at sinks that are located close to medication prep areas?", choices:["Yes","No"]},
      {text:"Are sinks readily accessible to healthcare providers?", choices:["Yes","No"]},
      {text:"Are hand washing supplies, such as soap, and paper towels, available?", choices:["Yes","No"]},
      {text:"Are alcohol dispensers readily available, filled, and functioning properly?", choices:["Yes","No"]},
    ],
    }],
  },
  {
    name: "Reprocessing-Clean-Area-Disinfection-Sterilization",
    number: 16,
    observables: ["One"],
    title: "Reprocessing: High Level Disinfection and Liquid Sterilization Process– “Clean” Area",
    instructions: "Observe area where instruments are reprocessed. For each category, record the observation Sum all Yes and No responses. Divide by sum of “Yes” + ”No”.",
    sections: [{
    header: "Equipment Reprocessing – Clean Area",
    choiceSet: ["Yes","No","N/A"],
    questions: [
      {text:"Are disinfected instruments stored in a manner to protect them from damage and contamination?", choices:["Yes","No"]},
      {text:"Is each piece of equipment labeled with the day of most recent disinfection?", choices:["Yes","No"]},
      {text:"Are scopes, if present, stored in a dedicated area and hung vertically to facilitate drying?", choices:["Yes","No","N/A"]},
      {text:"Is a log of reprocessed items (paper-based or electronic) maintained that documents:", parts:[
        {text:"The instrument reprocessed and date,", choices:["Yes","No"]},
        {text:"The technician who performed the reprocessing, and", choices:["Yes","No"]},
        {text:"An indication of whether or not the reprocessing run passed or failed any necessary chemical or mechanical tests.", choices:["Yes","No"]},
      ]},
    ],
    }],
  },
  {
    name: "Cough-Courtesy-Waiting-Room",
    number: 20,
    observables: ["One"],
    title: "Cough Courtesy: Waiting Room",
    instructions: " Observe the ambulatory care point of care testing area. For each category, record the observation. Sum all Yes and No responses. Divide by sum of “Yes” + ”No”.",
    sections: [{
    header: "Ambulatory Waiting Room: Observation Categories",
    choiceSet: ["Yes","No"],
    questions: [
      {text:"As patients first register for care, is there visible signage instructing them to alert the staff of a respiratory infection?", choices:["Yes","No"]},
      {text:"Are face masks and tissues readily available for patients and visitors with respiratory or flu-like symptoms?", choices:["Yes","No"]},
      {text:"Are hand hygiene supplies readily available to visitors in the waiting room?", choices:["Yes","No"]},
      {text:"Are trash receptacles readily available to visitors in the waiting room?", choices:["Yes","No"]},
    ],
    }]
  },
  {
    name: "Reprocessing-Dirty-Area-Disinfection-Sterilization",
    number: 15,
    observables: ["One"],
    title: "Reprocessing: High Level Disinfection and Liquid Sterilization Process– “Dirty” Area Using Chemical Soak Method",
    instructions: "Observe area where instruments are reprocessed by a soaking method using a liquid chemical germicide. For each category, record the observation. Sum all Yes and No responses. Divide by sum of “Yes” + ”No”.",
    sections: [{
      header: "Equipment Reprocessing",
      choiceSet: ["Yes","No"],
      questions: [
        {text:"Is the preprocessing “dirty” area separate from the clean area?", choices:["Yes","No"]},
        {text:"Is adequate space allotted for device inspection?", choices:["Yes","No"]},
        {text:"Are signs visible that include the reprocessing steps and recording requirements?", choices:["Yes","No"]},
        {text:"Is a traffic flow pattern from “soiled” to “clean” clearly delineated in the area in which technicians progress through their reprocessing tasks?", choices:["Yes","No"]},
        {text:"Is there a readily-available supply of personal protective equipment, including gloves, cover gowns, eye and face protection?", choices:["Yes","No"]},
        {text:"Is an eyewash station available within a 10 second travel distance from chemicals being used?", choices:["Yes","No"]},
        {text:"Is weekly eye wash station maintenance documented, including flushing and temperature validation (60° F to 100° F, or 16° C to 38 °C)?", choices:["Yes","No"]},
      ],
    },
      {
        header: "Equipment Reprocessing – Dirty Area",
        choiceSet: ["Yes","No"],
        questions: [
          {text:"Are chemical potency test strips stored appropriately and labeled with “opened” and “use by” dates?", choices:["Yes","No"]},
          {text:"Are opened liquid chemical containers labeled with the date opened and the use-by date?", choices:["Yes","No"]},
          {text:"Do log books show test strip quality control recording?", choices:["Yes","No"]},
          {text:"Do log books show results of liquid chemical germicide potency testing?", choices:["Yes","No"]},
          {text:"Are spill kits readily available?", choices:["Yes","No"]},
          {text:"Are safety data sheets (SDS, formerly known as MSDS) available for the chemicals used in the area?", choices:["Yes","No"]},
          {text:"Are instrument instructions for use (IFUs) readily available for each equipment item reprocessed in the area?", choices:["Yes","No"]},
        ],
      }],
  },
  {
    name: "Standard-Precautions-Hand-Hygiene-Supplies",
    number: 4,
    observables: ["Room 1", "Room 2", "Room 3", "Room 4", "Room 5"],
    title: "Standard Precautions: Observation Categories",
    instructions: "Observe patient care areas or areas outside of patient rooms. For each category, record the observation. In the column on the right, sum (across) the total number of “Yes” and the total number of observations (“Yes” + “No”). Sum all categories (down) for overall performance.",
    sections: [{
      header: "Standard Precautions: Observation Categories",
      choiceSet: ["Yes","No"],
      questions: [
        {text:"Are functioning sinks readily accessible in the patient care area?", choices:["Yes","No"]},
        {text:"Are all handwashing supplies, such as soap and paper towels, available?", choices:["Yes","No"]},
        {text:"Is the sink area clean and dry?", choices:["Yes","No"]},
        {text:"Are any clean patient care supplies on the counter within a splash-zone of the sink?", choices:["Yes","No"]},
        {text:"Are signs promoting hand hygiene displayed in the area?", choices:["Yes","No"]},
        {text:"Are alcohol dispensers readily accessible?", choices:["Yes","No"]},
        {text:"Are alcohol dispensers filled and working properly?", choices:["Yes","No"]},
      ],
    }],
  },
  {
    name: "Neonatal-Isolettes-Basinets",
    number: 12,
    observables: ["Baby 1", "Baby 2", "Baby 3", "Baby 4"],
    title: "Neonatal Environment: Observation of Isolettes/basinets",
    instructions: "Observe neonatal patients isolette/bassinet areas. Observe each practice and record the observation. In the column on the right, sum (across) the total number of “Yes” and the total number of observations (“Yes” + “No”). Sum all categories (down) for overall performance.",
    sections: [{
      header: "Infant isolette/basinet: Observation Categories",
      choiceSet: ["Yes","No"],
      questions: [
        {text:"Is the patient care area free from clutter?", choices:["Yes","No"]},
        {text:"Are gloves, gowns, masks, and face shields, readily available near each bed space?", choices:["Yes","No"]},
        {text:"Are all infant isolettes/bassinets at least 3 feet from the nearest sink?", choices:["Yes","No"]},
        {text:"Alcohol-based hand rub is available at the point of care.", choices:["Yes","No"]},
        {text:"Hands-free handwashing sinks are within 20 feet of each bed space.", choices:["Yes","No"]},
      ],
    }],
  },
  {
    name: "Standard-Precautions-Needlestick-Laundry",
    number: 9,
    observables: ["Room/Area 1", "Room/Area 2", "Room/Area 3", "Room/Area 4","Room/Area 5"],
    title: "Standard Precautions: Observation of Needlestick Prevention and Care of Laundry",
    instructions: "Observe patient care areas or areas outside of patient rooms. For each category, record the observation. In the column on the right, sum (across) the total number of “Yes” and the total number of observations (“Yes” + “No”). Sum all categories (down) for overall performance.",
    sections: [{
      header: "Standard Precautions: Observation Categories",
      choiceSet: ["Yes","No"],
      questions: [
        {text:"Are sharps containers available?", choices:["Yes","No"]},
        {text:"Are sharps containers properly secured and not full?", choices:["Yes","No"]},
        {text:"Are sharps containers positioned at 52” to 56” above floor?", choices:["Yes","No"]},
        {text:"Are hampers for soiled laundry labeled or color-coded?", choices:["Yes","No"]},
        {text:"Are clean linen supplies spatially separated from soiled areas or waste and covered or contained within a cabinet?", choices:["Yes","No"]},
      ],
    }],
  },
  {
    name: "Neonatal-Central-Catheter",
    number: 12,
    observables: ["Baby 1", "Baby 2", "Baby 3", "Baby 4"],
    title: "Neonatal Central Catheter: Observation",
    instructions: "Observe neonatal patients with central lines in place. Observe each practice and record the observation. In the column on the right, sum (across) the total number of “Yes” and the total number of observations (“Yes” + “No”). Sum all categories (down) for overall performance.",
    sections: [{
      header: "Central catheter: Observation Categories",
      choiceSet: ["Yes","No"],
      questions: [
        {text:"Is the dressing adhesive intact over the catheter insertion site and drainage contained?", choices:["Yes","No"]},
        {text:"Is the dressing dated and timed according to facility policy?", choices:["Yes","No"]},
        {text:"Is the catheter secured to reduce movement or tension?", choices:["Yes","No"]},
        {text:"Are hampers for soiled laundry labeled or color-coded?", choices:["Yes","No"]},
        {text:"Are the administration tubing sets labeled and within the date range according to facility policy?", choices:["Yes","No"]},
      ],
    }],
  },
  {
    name: "Neonatal-Nutritional-Prep-Area",
    number: 14,
    observables: ["Baby"],
    title: "Neonatal Environment: Observation of Nutritional Preparation Area",
    instructions: "Observe nutritional preparation area. Observe each practice below and answer Yes, No, or N/A. Sum all Yes and No responses. Divide by sum of “Yes” + ”No”.",
    sections: [{
      header: "Nutritional preparation area: Observation Categories",
      choiceSet: ["Yes","No","N/A"],
      questions: [
        {text:"Are surfaces in the nutrition preparation area visibly clean and free from clutter?", choices:["Yes","No","N/A"]},
        {text:"If powdered formula is used, is sterile water provided for dilution or reconstitution?", choices:["Yes","No","N/A"]},
        {text:"Thermometers in the breast milk storage refrigerator and freezer are easy to visualize and are within the range noted below?", choices:["Yes","No","N/A"]},
        {text:"Are the breast milk storage refrigerator and freezer temperatures monitored and recorded every 4 hours?", choices:["Yes","No","N/A"]},
        {text:"Is stored breast milk labeled with name, date, and time of pumping?", choices:["Yes","No","N/A"]},
        {text:"Is breast milk stored in a manner that prevents misadministration (e.g., each mother’s milk is in a dedicated tray?)", choices:["Yes","No","N/A"]},
        {text:"Is the refrigerator/freezer in which breast milk is stored clean and dedicated to patient nutrition supplies only?", choices:["Yes","No","N/A"]},
        {text:"Are waterless warmers used to thaw and warm breast milk (i.e., there is no evidence of thawing by immersion in tap water)?", choices:["Yes","No","N/A"]},
        {text:"Are ready-for-use breast pumps clean, labeled as clean, and stored separately from breast pumps that have not been cleaned?", choices:["Yes","No","N/A"]},
      ],
    }],
  },
  {
    name: "Standard-Precautions-PPE-Provision",
    number: 5,
    observables: ["Room 1", "Room 2", "Room 3", "Room 4", "Room 5"],
    title: "Standard Precautions: Observation of Personal Protective Equipment Provision",
    instructions: "Observe patient care areas or areas outside of patient rooms. For each category, record the observation. In the column on the right, sum (across) the total number of “Yes” and the total number of observations (“Yes” + “No”). Sum all categories (down) for overall performance.",
    sections: [{
      header: "Standard Precautions: Observation Categories",
      choiceSet: ["Yes","No"],
      questions: [
        {text:"Are gloves readily available outside each patient room or any point of care?", choices:["Yes","No"]},
        {text:"Are cover gowns readily available near each patient room or point of care?", choices:["Yes","No"]},
        {text:"Is eye protection (face shields or goggles) readily available near each patient room or point of care?", choices:["Yes","No"]},
        {text:"Are face masks readily available near each patient room or point of care?", choices:["Yes","No"]},
        {text:"Are alcohol dispensers readily accessible and functioning?", choices:["Yes","No"]},
      ],
    }],
  },
  {
    name: "Injection-Safety-Point-of-Care-Testing",
    number: 22,
    observables: ["Room"],
    title: "Injection Safety: Point of Care Testing",
    instructions: "Observe the ambulatory care point of care testing area. For each category, record the observation. Sum all Yes and No responses. Divide by sum of “Yes” + ”No”.",
    sections: [{
      header: "Patient Care Area: Observation Categories",
      choiceSet: ["Yes","No","N/A"],
      questions: [
        {text:"Are sharps containers properly secured and not full?", choices:["Yes","No"]},
        {text:"Are sharps containers available at the point of use?", choices:["Yes","No"]},
        {text:"Are cleaning and disinfection supplies for examination tables and test surfaces readily available?", choices:["Yes","No"]},
        {text:"Is a new single-use auto-disabling lancing device used for each patient?", choices:["Yes","No","N/A"]},
        {text:"Are all point of care testing devices being disinfected after each use with an EPA- registered product that is consistent with manufacturer instructions for use?", choices:["Yes","No"]},
        {text:"Is the required personal protective equipment for disinfectant use readily available?", choices:["Yes","No"]},
      ],
    }],
  },
  {
    name: "Injection-Safety-Portable-Med-System",
    number: 11,
    observables: ["Cart 1","Cart 2","Cart 3"],
    title: "Injection Safety: Observation of Portable Medication Systems",
    instructions: "Observe three portable medication carts. For each category, record the observation as Yes, No, or N/A. In the column on the right, sum (across) the total number of “Yes” and the total number of observations (“Yes” + “No”). Divide by sum of “Yes”+”No”. Disregard not applicable categories.",
    sections: [{
      header: "Medication cart: Observation Categories",
      choiceSet: ["Yes","No","N/A"],
      questions: [
        {text:"If multi-dose injectable medications are present are they maintained in a dedicated medication prep space?", choices:["Yes","No","N/A"]},
        {text:"Are alcohol dispensers readily accessible, filled, and functioning properly?", choices:["Yes","No"]},
        {text:"Is the medication cart free of opened single dose vials or opened single use containers?", choices:["Yes","No"]},
        {text:"If open multi-dose vials are present, are they dated and within the Beyond Use Date (BUD) and the manufacturer’s expiration period?", choices:["Yes","No","N/A"]},
        {text:"Are safety syringes available?", choices:["Yes","No"]},
        {text:"Are sharps containers available, secured, and not full?", choices:["Yes","No"]},
      ],
    }],
  },
  {
    name: "Urinary-Catheter-Observation",
    number: 2,
    observables: ["Patient 1","Patient 2","Patient 3","Patient 4"],
    title: "Urinary Catheter: Observation",
    instructions: "Observe patients with urinary catheters in place. Observe each practice and record the observation. In the column on the right, sum (across) the total number of “Yes” and the total number of observations (“Yes” + “No”). Sum all categories (down) for overall performance.",
    sections: [{
      header: "Urinary catheter: Observation Categories",
      choiceSet: ["Yes","No"],
      questions: [
        {text:"Is the catheter properly secured to the patient?", choices:["Yes","No"]},
        {text:"Is there unobstructed flow from the catheter into the bag?", choices:["Yes","No"]},
        {text:"Is the collection bag _below_ the level of the bladder?", choices:["Yes","No"]},
        {text:"Are the bag and tubing off of the floor?", choices:["Yes","No"]},
      ],
    }],
  },
  {
    name: "Environment-of-Care-Vaccine-Storage-Area",
    number: 21,
    observables: ["Area"],
    title: "Environment of Care: Vaccine Storage Areas",
    instructions: "Observe vaccine storage area. For each category, record the observation. Sum all Yes and No responses. Divide by sum of “Yes” + ”No”.",
    sections: [{
      header: "Vaccine Storage Area: Observation Categories",
      choiceSet: ["Yes","No"],
      questions: [
        {text:"Are vaccine storage refrigerator and freezer temperatures within the appropriate ranges (Refrigerator: 2° C to 8° C; 36° F to 46° Freezer: -50° C to -15° C; -58° F to +5° F)?", choices:["Yes","No"]},
        {text:"Are vaccine storage refrigerator and freezer temperatures recorded twice daily?", choices:["Yes","No"]},
        {text:"Are safeguards, such as self-closing hinges and door alarms, in place to ensure that the refrigerator/freezer doors remain closed.", choices:["Yes","No"]},
        {text:"Are refrigerator/freezer door gaskets clean?", choices:["Yes","No"]},
        {text:"Are vaccines stored in the center of the refrigerator and freezer spaces, in the original packaging, and inside designated storage trays?", choices:["Yes","No"]},
        {text:"Are drinks and food absent from the refrigerator/freezer?", choices:["Yes","No"]},
      ],
    }],
  },
  {
    name: "Ventilator-Observation",
    number: 3,
    observables: ["Patient 1", "Patient 3", "Patient 3", "Patient 4"],
    title: "Ventilator: Observation",
    instructions: "Observe patients on ventilators. For each category, record the observation. In the column on the right, sum (across) the total number of “Yes” and the total number of observations (“Yes” + “No”). Sum all categories (down) for overall performance.",
    sections: [{
      header: "Ventilator: Observation Categories",
      choiceSet: ["Yes","No"],
      questions: [
        {text:"Is the head of the bed elevated >30 degrees?", choices:["Yes","No"]},
        {text:"Is the ventilator tubing free of excessive condensation?", choices:["Yes","No"]},
        {text:"Are supplies needed for oral care readily available?", choices:["Yes","No"]},
      ],
    }],
  },
  {
    name: "Visitor-Area-Observation",
    number: 15,
    observables: ["Area"],
    title: "Observation of Visitor Area",
    instructions: "Observe visitor area. Observe each practice below and answer Yes, No, or N/A. Sum all Yes and No responses. Divide by sum of “Yes” + ”No”.",
    sections: [{
      header: "Visitor area: Observation Categories",
      choiceSet: ["Yes","No","N/A"],
      questions: [
        {text:"Are hand hygiene supplies readily accessible by visitors in the waiting area?", choices:["Yes","No","N/A"]},
        {text:"Are face masks readily available?", choices:["Yes","No","N/A"]},
        {text:"Is there visible signage that clearly states that if visitors are ill, they should report to the healthcare team?", choices:["Yes","No","N/A"]},
        {text:"Is there visible signage that clearly states what, if any, visitor (children or otherwise) restrictions are in place?", choices:["Yes","No","N/A"]},
      ],
    }],
  },
]
