<template>
  <div class="container">
    <div class="toolbar">
      <select v-model="activeCardId" @change="cardSelected">
        <option
          v-for="(card, cIdx) in CARDS"
          :value="card.id"
          :key="`${card.id}-${cIdx}`"
          >{{ card.number }} : {{ card.name }}</option
        >
      </select>
      <button v-if="canExport" class="export" @click="exportData">
        export
      </button>
      <button v-if="canExport" class="export" @click="emailData">email</button>
      <button v-if="canReset" class="reset" @click="resetData">reset</button>
      <button v-if="canUndo" class="undo" @click="undoReset">undo reset</button>
    </div>

    <div class="header">
      <div class="title">{{ survey.title }}</div>
      <div class="number">{{ survey.number }}</div>
    </div>

    <div class="instructions">
      <b>Instructions</b>: {{ survey.instructions }} Click
      <a
        style="color: unset"
        :href="survey.pdf"
        @click="ping(`reference pdf ${survey.number}`)"
        >here</a
      >
      to see the reference document.
    </div>

    <table
      v-for="(section, sIdx) in survey.sections"
      :key="`survey-${survey.number}-section-${sIdx}`"
    >
      <template v-if="isMultiAreaSurvey(survey)">
        <thead>
          <tr>
            <th rowspan="2" colspan="2">{{ section.header }}</th>
            <th
              rowspan="2"
              colspan="1"
              v-for="(observable, idx) in section.observables"
              :key="
                `survey-${survey.number}-section-${sIdx}-observable-header-${idx}`
              "
            >
              {{ observable }}
            </th>
            <th rowspan="1" colspan="2">Summary Of Observations</th>
          </tr>
          <tr>
            <th>Yes</th>
            <th>Total Observed</th>
          </tr>
        </thead>

        <tfoot v-if="isFinalSection(survey, section)">
          <th :colspan="section.observables.length + 2">
            Total Yes and Total Observed
          </th>
          <td align="center">{{ countSurveyObservations(survey, ["Yes"]) }}</td>
          <td align="center">
            {{ countSurveyObservations(survey, ["Yes", "No"]) }}
          </td>
        </tfoot>

        <tbody>
          <tr
            v-for="(q, qIdx) in section.questions"
            :key="`survey-${survey.number}-section-${sIdx}-question-${qIdx}`"
          >
            <td class="questionNumber">{{ q.number }}</td>
            <td class="questionText">{{ q.text }}</td>
            <template v-for="(o, oIdx) in q.observations">
              <td
                :key="
                  `survey-${survey.number}-section-${sIdx}-question-${qIdx}-observation-${oIdx}`
                "
              >
                <template v-for="(c, cIdx) in q.choices">
                  <div
                    class="checkbox"
                    :key="
                      `survey-${survey.number}-section-${sIdx}-question-${qIdx}-observation-${oIdx}-choice-${cIdx}`
                    "
                  >
                    <input
                      class="checkbox"
                      id="checkbox_id(qIdx, oIdx, cIdx)"
                      type="checkbox"
                      v-model="o[c]"
                      @click="
                        ping(
                          `survey-${survey.number}-section-${qIdx}-observation-${oIdx}-checkbox-${cIdx}`
                        )
                      "
                      @change="enforceChoice(o, c)"
                    />
                    <label
                      class="checkbox"
                      for="checkbox_id(qIdx, oIdx, cIdx)"
                      >{{ c }}</label
                    >
                  </div>
                </template>
              </td>
            </template>
            <td align="center">
              {{ countQuestionObservations(q, ["Yes"]) }}
            </td>
            <td align="center">
              {{ countQuestionObservations(q, ["Yes", "No"]) }}
            </td>
          </tr>
        </tbody>
      </template>

      <template v-else>
        <thead>
          <tr>
            <th rowspan="1" colspan="2">{{ section.header }}</th>
            <th rowspan="1" :colspan="section.choices.length">
              Summary Of Observations
            </th>
          </tr>
        </thead>

        <tfoot v-if="isFinalSection(survey, section)">
          <th colspan="2">Total</th>
          <td
            align="center"
            v-for="(choice, idx) in section.choices"
            :key="`survey-${survey.number}-section-${sIdx}-choice-${idx}`"
          >
            {{ countSurveyObservations(survey, [choice]) }}
          </td>
        </tfoot>

        <tbody>
          <template v-for="(q, qIdx) in section.questions">
            <template v-if="q.choices">
              <tr :key="`survey-${survey.number}-section-${qIdx}`">
                <td class="questionNumber">{{ q.number }}</td>
                <td class="questionText">{{ q.text }}</td>
                <template v-for="(o, oIdx) in q.observations">
                  <td
                    v-for="(c, cIdx) in q.choices"
                    :key="
                      `survey-${survey.number}-section-${qIdx}-observation-${oIdx}-checkbox-${cIdx}`
                    "
                  >
                    <div class="checkbox">
                      <input
                        class="checkbox"
                        id="checkbox_id(qIdx, 0, cIdx)"
                        type="checkbox"
                        v-model="o[c]"
                        @click="
                          ping(
                            `survey-${survey.number}-section-${qIdx}-observation-${oIdx}-checkbox-${cIdx}`
                          )
                        "
                        @change="enforceChoice(o, c)"
                      />
                      <label
                        class="checkbox"
                        for="checkbox_id(qIdx, 0, cIdx)"
                        >{{ c }}</label
                      >
                    </div>
                  </td>
                </template>
              </tr>
            </template>
            <template v-if="q.parts">
              <tr :key="`survey-${survey.number}-section-${qIdx}`">
                <td class="questionNumber" :rowspan="q.parts.length + 1">
                  {{ q.number }}
                </td>
                <td class="questionText">{{ q.text }}</td>
              </tr>
              <tr
                v-for="(part, pIdx) in q.parts"
                :key="`${q.number}-part-${pIdx}`"
              >
                <td class="questionPartText">
                  {{ part.number }}. {{ part.text }}
                </td>
                <template v-for="(o, oIdx) in part.observations">
                  <td
                    v-for="(c, cIdx) in part.choices"
                    :key="`${q.number}-choice-${cIdx}-${oIdx}`"
                  >
                    <div class="checkbox">
                      <input
                        class="checkbox"
                        id="checkbox_id(qIdx, 0, cIdx)"
                        type="checkbox"
                        v-model="o[c]"
                        @click="
                          ping(
                            `survey-${survey.number}-section-${qIdx}-observation-${oIdx}-checkbox-${cIdx}`
                          )
                        "
                        @change="enforceChoice(o, c)"
                      />
                      <label
                        class="checkbox"
                        for="checkbox_id(qIdx, 0, cIdx)"
                        >{{ c }}</label
                      >
                    </div>
                  </td>
                </template>
              </tr>
            </template>
          </template>
        </tbody>
      </template>
    </table>
    <a href="https://github.com/abrie/E-QUOTS"><small>Source Code</small></a>
  </div>
</template>

<script>
import "whatwg-fetch";
import reportMetric from "../metrics.js";
import upload from "../upload.js";
import DATA from "../Cards.json";
import SurveyTools from "../Survey.js";

export default {
  name: "CardStack",
  data() {
    return {
      activeCardId: 7,
      backup: false,
      survey: false
    };
  },
  computed: {
    canReset() {
      return (
        this.countSurveyObservations(this.survey, ["Yes", "No", "N/A"]) > 0
      );
    },
    canUndo() {
      return (
        this.backup !== false &&
        this.countSurveyObservations(this.survey, ["Yes", "No", "N/A"]) === 0
      );
    },
    canExport() {
      return (
        this.countSurveyObservations(this.survey, ["Yes", "No", "N/A"]) > 0
      );
    },
    activeCard() {
      const card = this.CARDS.find(card => card.id === this.activeCardId);
      return card;
    }
  },
  methods: {
    isMultiAreaSurvey: SurveyTools.isMultiAreaSurvey,
    isFinalSection: SurveyTools.isFinalSection,
    countSurveyObservations: SurveyTools.countSurveyObservations,
    countQuestionObservations: SurveyTools.countQuestionObservations,
    enforceChoice: (o, c) => {
      SurveyTools.enforceChoice(o, c);
    },
    label(qIdx, rIdx, yesno) {
      return `question-${qIdx}-observable-${rIdx}-${yesno}`;
    },
    ping(data) {
      const location = window.location.href;
      reportMetric({ location, data });
    },
    upload(data, filename) {
      const blob = new Blob([data], { type: "text/csv" });

      if (window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(blob, filename);
      } else {
        var elem = window.document.createElement("a");
        elem.href = window.URL.createObjectURL(blob);
        elem.download = filename;
        document.body.appendChild(elem);
        elem.click();
        document.body.removeChild(elem);
      }
    reportMetric,
    generateEmail() {
      const data = `To: User <user@domain.demo>
Subject: Subject
X-Unsent: 1
Content-Type: text/html

<html>
<body>
<span style="color:red">Test message</span>
</body>
</html>
`;
      upload(data, "equots-test-email.eml", "text/plain");
    },
    exportData() {
      this.ping("exportData");
      const today = new Date().toLocaleDateString("en-US");
      const datestring = today.replace(/\//g, "-");
      const filename = `${this.survey.name}_${datestring}.csv`;
      const data = SurveyTools.generateCSV(this.survey);
      this.upload(data, filename);
    },
    emailData() {
      this.ping("emailData");
      const today = new Date().toLocaleDateString("en-US");
      const datestring = today.replace(/\//g, "-");
      const filename = `${this.survey.name}_${datestring}.csv`;
      const text = SurveyTools.generateCSV(this.survey);
      var mailto_link =
        "mailto:" +
        "name@example.com" +
        "?subject=" +
        filename +
        "&body=" +
        encodeURI(text);

      var element = document.createElement("a");
      element.setAttribute("href", mailto_link);

      element.style.display = "none";
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);
    },
    resetData() {
      this.ping("resetData");
      this.backup = this.survey;
      this.survey = new SurveyTools.Survey(this.activeCard);
    },
    undoReset() {
      this.ping("undoReset");
      this.survey = this.backup;
      this.backup = false;
    },
    cardSelected() {
      this.ping(`cardSelected:${this.activeCard.id}`);
      this.survey = new SurveyTools.Survey(this.activeCard);
      this.backup = false;
    }
  },
  created() {
    this.ping(`created`);
    this.CARDS = DATA.cards.sort((a, b) => {
      if (a.number > b.number) {
        return 1;
      }
      if (a.number < b.number) {
        return -1;
      }

      return a.name.localeCompare(b.name);
    });

    this.CARDS.forEach(card => (card.id = `${card.number}-${card.name}`));
    this.activeCardId = this.CARDS[0].id;
    this.survey = new SurveyTools.Survey(this.activeCard);
    this.backup = false;
  }
};
</script>

<style>
body {
  /* Disabled for IE11 - TODO, remove this (or find a suitable polyfill).
  --color-one: rgb(81, 130, 187);
  --color-two: rgb(237, 242, 248);
  --color-three: rgb(186, 205, 228);
  --color-four: rgb(245, 227, 83);
  --header-height: 3em;
  */
}

div.toolbar {
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: grey;
  height: 3rem;
  z-index: 9;
  padding: 0 0.5rem 0 0.5rem;
  border-bottom: 1px solid black;
}

div.header {
  margin-top: 4rem;
  display: flex;
  flex-direction: row;
  min-height: 3em;
  position: relative;
  font-size: 1.5em;
  background: rgb(81, 130, 187);
  border: 1px solid rgb(81, 130, 187);
  align-items: stretch;
  color: white;
  border-radius: 0.25em 0 0 0.25em;
  overflow: hidden;
}

div.header div.logo {
  flex: 0 0 auto;
  width: 4em;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-right: 1px solid white;
  border-radius: 0.25em;
  overflow: hidden;
  padding-right: 0.25em;
  background: rgb(13, 95, 169);
  color: #ddd;
}

div.header div.title {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 0.5em;
  font-size: 0.95em;
}

div.header div.number {
  flex: 0 0 10%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: rgb(245, 227, 83);
  color: rgb(81, 130, 187);
  text-align: center;
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
  margin: 0.5em;
}

label.checkbox {
  flex: 1 1 auto;
}

input[type="checkbox"].checkbox {
  flex: 1 1 auto;
}

table {
  border: 1px solid rgb(81, 130, 187);
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

th {
  background: rgb(81, 130, 187);
  border: 1px solid white;
  color: white;
}

tr:nth-child(even) {
  background-color: rgb(186, 205, 228);
}

tr:nth-child(odd) {
  background-color: rgb(237, 242, 248);
}

button.export {
  margin: 0.5rem;
  font-variant: small-caps;
  font-size: 1.25rem;
  background: lightgreen;
}

button.reset {
  margin: 0.5rem;
  font-variant: small-caps;
  font-size: 1.25rem;
  background: orange;
}

button.undo {
  margin: 0.5rem;
  font-variant: small-caps;
  font-size: 1.25rem;
  background: lightblue;
}
</style>
