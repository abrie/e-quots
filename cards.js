const cards = [
  {
    name: "Isolation-Area-AIIR-Exterior-P",
    number: 7,
    rooms: ["Room 1", "Room 2", "Room 3"],
    title: "Isolation: Observation of Area Exterior to Airborne Infection Isolation Rooms",
    instructions: "If there are any patients requiring Airborne Infection Isolation on unit, observe area outside of each isolation room. Observe each practice and record the observation. In the column on the right, sum (across) the total number of “Yes” and the total number of observations (“Yes” + “No”). Sum all categories (down) for overall performance.",
    sections: [{
      questionHeader: "Isolation room: Observation Categories",
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
    name: "Isolation-Area-Contact-Isolation-Exterior-P",
    number: 6,
    rooms: ["Room 1", "Room 2", "Room 3"],
    title: "Isolation: Observation of Area Exterior to Contact Isolation Rooms",
    instructions: "Instructions: Observe areas outside of isolation rooms. Observe each practice and record the observation. In the column on the right, sum (across) the total number of “Yes” and the total number of observations (“Yes” + “No”). Sum all categories (down) for overall performance. Disregard not applicable categories. For example, cover gowns should be outside contact precautions rooms, but may not be required outside a room with airborne isolation precautions only.",
    sections: [{
      questionHeader: "Isolation room: Observation Categories",
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
    name: "Central-Venous-Catheter-Observation-P",
    number: 1,
    rooms: ["Patient 1", "Patient 2", "Patient 3", "Patient 4"],
    title: "Central Venous Catheter: Observation",
    instructions: "Observe patients with central lines in place. Observe each practice and record the observation. In the column on the right, sum (across) the total number of “Yes” and the total number of observations (“Yes” + “No”). Sum all categories (down) for overall performance.",
    sections: [{
    questionHeader: "Central catheter: Observation Categories",
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
    name: "Injection-Safety-Central-Med-Area-P",
    number: 10,
    rooms: ["One"],
    title: "Injection Safety: Observation of Centralized Medication Area",
    instructions: "Observe medication preparation area. For each category, record the observation. Observe each practice below and answer Yes, No, or N/A. Sum all Yes and No responses. Divide by sum of “Yes”+”No”. Disregard not applicable categories.",
    sections: [{
    questionHeader: "Medication preparation room: Observation Categories",
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
    name: "Reprocessing-Clean-Area-Disinfection-Sterilization-P", // TODO!!
    number: 16,
    rooms: ["One"],
    title: "Reprocessing: High Level Disinfection and Liquid Sterilization Process– “Clean” Area",
    instructions: "Observe area where instruments are reprocessed. For each category, record the observation Sum all Yes and No responses. Divide by sum of “Yes” + ”No”.",
    sections: [{
    questionHeader: "Equipment Reprocessing – Clean Area",
    questions: [
      {text:"Are disinfected instruments stored in a manner to protect them from damage and contamination?", choices:["Yes","No"]},
      {text:"Is each piece of equipment labeled with the day of most recent disinfection?", choices:["Yes","No"]},
      {text:"Are scopes, if present, stored in a dedicated area and hung vertically to facilitate drying?", choices:["Yes","No","N/A"]},
      {text:"Is a log of reprocessed items (paper-based or electronic) maintained that documents:", choices:["Yes","No"]},
    ],
    }],
  },
  {
    name: "Cough-Courtesy-Waiting-Room-P",
    number: 20,
    rooms: ["One"],
    title: "Cough Courtesy: Waiting Room",
    instructions: " Observe the ambulatory care point of care testing area. For each category, record the observation. Sum all Yes and No responses. Divide by sum of “Yes” + ”No”.",
    sections: [{
    questionHeader: "Ambulatory Waiting Room: Observation Categories",
    questions: [
      {text:"As patients first register for care, is there visible signage instructing them to alert the staff of a respiratory infection?", choices:["Yes","No"]},
      {text:"Are face masks and tissues readily available for patients and visitors with respiratory or flu-like symptoms?", choices:["Yes","No"]},
      {text:"Are hand hygiene supplies readily available to visitors in the waiting room?", choices:["Yes","No"]},
      {text:"Are trash receptacles readily available to visitors in the waiting room?", choices:["Yes","No"]},
    ],
    }]
  },
  {
    name: "Reprocessing-Dirty-Area-Disinfection-Sterilization-P",
    number: 15,
    rooms: ["One"],
    title: "Reprocessing: High Level Disinfection and Liquid Sterilization Process– “Dirty” Area Using Chemical Soak Method",
    instructions: "Observe area where instruments are reprocessed by a soaking method using a liquid chemical germicide. For each category, record the observation. Sum all Yes and No responses. Divide by sum of “Yes” + ”No”.",
    sections: [{
      questionHeader: "Equipment Reprocessing",
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
        questionHeader: "Equipment Reprocessing – Dirty Area",
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
]
