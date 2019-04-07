<template>
    <div class="container" >
      <div>
        <span>
          <select v-model="activeCardNumber" @change="cardSelected">
            <option v-for="(card, cIdx) in CARDS" :value="card.number" :key="`${card.number}-${cIdx}`">{{card.number}} : {{ card.name }}</option>
          </select>
        </span>
        <div style="position: absolute; right:0; top:0; margin-right: 1em;">
          <a href="https://github.com/abrie/E-QUOTS"><small>Source Code</small></a>
        </div>
      </div>
      <div class="header">
        <div class="logo"><i>logo</i></div>
        <div class="title">{{ survey.title }}</div>
        <div class="number">{{ survey.number }}</div>
      </div>

      <div class="instructions">
        <b>Instructions</b>: {{ survey.instructions }}
      </div>

      <table v-for="(section, sIdx) in survey.sections" :key="`survey-${survey.number}-section-${sIdx}`">
        <template v-if="isMultiAreaSurvey(survey)">
          <thead>
            <tr>
              <th rowspan="2" colspan="2">{{ section.header }}</th>
              <th rowspan="2" colspan="1" v-for="(observable,idx) in section.observables" :key="`survey-${survey.number}-section-${sIdx}-observable-header-${idx}`">{{ observable }}</th>
              <th rowspan="1" colspan="2"> Summary Of Observations </th>
            </tr>
            <tr>
              <th>Yes</th>
              <th>Total Observed</th>
            </tr>
          </thead>

          <tfoot v-if="isFinalSection(survey, section)">
            <th :colspan="section.observables.length + 2">Total Yes and Total Observed</th>
            <td align="center"> {{ countSurveyObservations(survey, ["Yes"]) }} </td>
            <td align="center"> {{ countSurveyObservations(survey, ["Yes","No"]) }}</td>
          </tfoot>

          <tbody>
            <tr v-for="(q, qIdx) in section.questions" :key="`survey-${survey.number}-section-${sIdx}-question-${qIdx}`">
              <td class="questionNumber">{{ q.number }}</td>
              <td class="questionText" >{{ q.text }}</td>
              <template v-for="(o, oIdx) in q.observations">
                <td :key="`survey-${survey.number}-section-${sIdx}-question-${qIdx}-observation-${oIdx}`">
                  <template v-for="(c, cIdx) in q.choices">
                    <div class="checkbox" :key="`survey-${survey.number}-section-${sIdx}-question-${qIdx}-observation-${oIdx}-choice-${cIdx}`">
                      <input class="checkbox" id="checkbox_id(qIdx, oIdx, cIdx)" type="checkbox" v-model="o[c]" @change="enforceChoice(o, c)">
                      <label class="checkbox" for="checkbox_id(qIdx, oIdx, cIdx)" >{{ c }}</label>
                    </div>
                  </template>
                </td>
              </template>
              <td align="center">
                {{ countQuestionObservations(q, ["Yes"]) }}
              </td>
              <td align="center">
                {{ countQuestionObservations(q, ["Yes","No"]) }}
              </td>
            </tr>
          </tbody>
        </template>

        <template v-else>
          <thead>
            <tr>
              <th rowspan="1" colspan="2">{{ section.header }}</th>
              <th rowspan="1" :colspan="section.choices.length"> Summary Of Observations </th>
            </tr>
          </thead>

          <tfoot v-if="isFinalSection(survey, section)">
            <th colspan="2">Total</th>
            <td align="center" v-for="(choice,idx) in section.choices" :key="`survey-${survey.number}-section-${sIdx}-choice-${idx}`">
              {{ countSurveyObservations(survey, [choice]) }}
            </td>
          </tfoot>

          <tbody>
            <template v-for="(q, qIdx) in section.questions">
              <template v-if="q.choices">
                <tr :key="`survey-${survey.number}-section-${qIdx}`">
                  <td class="questionNumber">{{ q.number }}</td>
                  <td class="questionText" >{{ q.text }}</td>
                  <template v-for="(o, oIdx) in q.observations">
                    <td v-for="(c, cIdx) in q.choices" :key="`survey-${survey.number}-section-${qIdx}-observation-${oIdx}-checkbox-${cIdx}`">
                      <div class="checkbox">
                        <input class="checkbox" id="checkbox_id(qIdx, 0, cIdx)" type="checkbox" v-model="o[c]" @change="enforceChoice(o, c)">
                        <label class="checkbox" for="checkbox_id(qIdx, 0, cIdx)" >{{ c }}</label>
                      </div>
                    </td>
                  </template>
                </tr>
              </template>
              <template v-if="q.parts">
                <tr :key="`survey-${survey.number}-section-${qIdx}`">
                  <td class="questionNumber" :rowspan="q.parts.length+1">{{ q.number }}</td>
                  <td class="questionText">{{ q.text }}</td>
                </tr>
                <tr v-for="(part, pIdx) in q.parts" :key="`${q.number}-part-${pIdx}`">
                  <td class="questionPartText" >{{part.number}}. {{part.text}}</td>
                  <template v-for="(o, oIdx) in part.observations">
                    <td v-for="(c, cIdx) in part.choices" :key="`${q.number}-choice-${cIdx}-${oIdx}`">
                      <div class="checkbox">
                        <input class="checkbox" id="checkbox_id(qIdx, 0, cIdx)" type="checkbox" v-model="o[c]" @change="enforceChoice(o, c)">
                        <label class="checkbox" for="checkbox_id(qIdx, 0, cIdx)" >{{ c }}</label>
                      </div>
                    </td>
                  </template>
                </tr>
              </template>
            </template>
          </tbody>
        </template>
      </table>
      <button v-if="canExport" class="export" @click="exportData">export</button>
      <button v-if="canExport" class="export" @click="emailData">email</button>
      <button v-if="canReset" class="reset" @click="resetData">reset</button>
      <button v-if="canUndo" class="undo" @click="undoReset">undo reset</button>
    </div>
</template>

<script>
import DATA from "../Cards.js"
import SurveyTools from "../Survey.js"

export default {
  name: 'HelloWorld',
  data() { return {
      activeCardNumber: 7,
      backup: false,
      survey: false,
    }
  },
  computed: {
    canReset() {
      return this.countSurveyObservations(this.survey, ["Yes","No","N/A"]) > 0;
    },
    canUndo() {
      return this.backup !== false && this.countSurveyObservations(this.survey, ["Yes","No","N/A"]) === 0;
    },
    canExport() {
      return this.countSurveyObservations(this.survey, ["Yes","No","N/A"]) > 0;
    },
    activeCard() {
      const card = this.CARDS.find( (c) => c.number === this.activeCardNumber);
      return card;
    },
  },
  methods: {
		isMultiAreaSurvey: SurveyTools.isMultiAreaSurvey,
		isFinalSection: SurveyTools.isFinalSection,
		countSurveyObservations: SurveyTools.countSurveyObservations,
		countQuestionObservations: SurveyTools.countQuestionObservations,
    enforceChoice: SurveyTools.enforceChoice,
    label(qIdx,rIdx,yesno) {
      return `question-${qIdx}-observable-${rIdx}-${yesno}`
    },
    exportData() {
      const today = (new Date()).toLocaleDateString("en-US");
      const datestring = today.replace(/\//g,"-");
      const filename = `${this.survey.name}_${datestring}.csv`;
      const text = SurveyTools.generateCSV(this.survey);
      var element = document.createElement('a');
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
      element.setAttribute('download', filename);

      element.style.display = 'none';
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);
    },
    emailData() {
      const today = (new Date()).toLocaleDateString("en-US");
      const datestring = today.replace(/\//g,"-");
      const filename = `${this.survey.name}_${datestring}.csv`;
      const text = SurveyTools.generateCSV(this.survey);
      var mailto_link = 'mailto:' + "name@example.com" + '?subject=' + filename + '&body=' + encodeURI(text);

      var element = document.createElement('a');
      element.setAttribute('href', mailto_link);

      element.style.display = 'none';
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);
    },
    resetData() {
      this.backup = this.survey;
      this.survey = new SurveyTools.Survey(this.activeCard);
    },
    undoReset() {
      this.survey = this.backup;
      this.backup = false;
    },
    cardSelected() {
      this.survey = new SurveyTools.Survey(this.activeCard);
      this.backup = false;
    },
  },
  created() {
		this.CARDS = DATA.CARDS;
    this.survey = new SurveyTools.Survey(this.activeCard);
    this.backup = false;
  }
}
</script>

<style>
      body {
        --color-one: rgb(81,130,187);
        --color-two: rgb(237,242,248);
        --color-three: rgb(186, 205, 228);
        --color-four: rgb(245, 227, 83);
        --header-height: 3em;
      }
      div.header {
        display: flex;
        flex-direction: row;
        height: var(--header-height);
        position: relative;
        font-size: 1.5em;
        background: var(--color-one);
        border: 1px solid var(--color-one);
        align-items: center;
        color: white;
        border-radius: 0.25em 0 0 0.25em;
        overflow: hidden;
      }
      div.header div.logo {
        flex: 0 0 auto;
        height: var(--header-height);
        width: 4em;
        text-align: center;
        line-height: var(--header-height);
        border-right: 1px solid white;
        border-radius: 0.25em;
        overflow: hidden;
        padding-right: 0.25em;
        background: rgb(13,95,169);
          color: #ddd;
      }
      div.header div.title {
        padding-left: 0.5em;
        font-size: 0.95em;
      }
      div.header div.number {
        flex: 0 0 10%;
        background: var(--color-four);
        color: var(--color-one);
        height: 100%;
        text-align: center;
        line-height: var(--header-height);
        margin-left: auto;
      }
      div.instructions {
        padding: 1em;
          font-size: 0.75em;
      }
      div.checkbox {
        display: flex;
        flex-flow: row;
        flex-wrap: nowrap;
          margin: 0.50em;
      }
      label.checkbox {
        flex: 1 1 auto;
      }
      input[type="checkbox"].checkbox {
        flex: 1 1 auto;
      }
      table {
        border: 1px solid var(--color-one);
        width: 100%;
      }
      td {
        border: 0px solid white;
      }

      td.questionNumber {
        padding: 0.5em;
        font-size: 1.25em;
      }

      td.questionText {
        padding-left: 0.5em;
      }

      td.questionPartText {
        padding-left: 1em;
      }
      select {
        font-size: 2em;
      }

      th {
        background: var(--color-one);
        border: 1px solid white;
        color: white;
      }
      tr:nth-child(even) {
        background-color: var(--color-three);
      }
      tr:nth-child(odd) {
        background-color: var(--color-two);
      }

      button.export {
        font-variant: small-caps;
        font-size: 125%;
          background: lightgreen;
      }
      button.reset {
        font-variant: small-caps;
        font-size: 125%;
        background: orange;
      }
      button.undo {
        font-variant: small-caps;
        font-size: 125%;
        background: lightblue;
      }
</style>
