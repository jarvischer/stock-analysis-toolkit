/* Register stable concept IDs with the active language and shared calculators. */
(function () {
  for (const section of SAT.content.sections) SAT.section({ ...section, after: section.id === 'growth-analysis' ? el => el.appendChild(SAT.growthChecklist()) : undefined });
  for (const section of SAT.content.sections) {
    const concepts = Object.values(SAT.content.concepts).filter(c => c.section === section.id);
    SAT.concepts(section.id, concepts.map(c => ({ ...c, calc: SAT.calculators[c.id] })));
  }
})();
