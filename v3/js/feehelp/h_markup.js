var hh =
[
  div("#tools-fee-help.aib-interactive", [
    div("#screen-grab.calc-wrap", [
      div(".head-block", [
        div(".head-left", [
          p([`What is your current gross salary per annum?`]),
          input("#salary", {
            "attributes": {
              "type": "text",
              "name": "salary",
              "placeholder": "$80,000"
            },
            "id": {
              "name": "id",
              "value": "salary"
            }
          })
        ]),
        div(".head-right", []),
        div(".clear")
      ]),
      div(".under-arrow"),
      div(".clear"),
      div(".pay-period", [
        h4([`PAY PERIOD:`]),
        div("#pay-period-select", [
          div(".pay-period-button", [`Weekly`]),
          div(".pay-period-button.selected", [`Fortnightly`]),
          div(".pay-period-button", [`Monthly`])
        ])
      ]),
      div(".calc-feehelp", [
        div(".calc-left", [
          h3([`$2,340`]),
          p([`Take home pay`])
        ]),
        div(".calc-right", [
          h3([`$2,155 (-$185)`]),
          p([`After FEE-HELP`])
        ])
      ]),
      div(".clear"),
      div(".calc-rates", [
        div(".calc-left", [
          p([`YOUR FEE-HELP REPAYMENTS WILL BE FOR`]),
          h3([`7 yrs`])
        ]),
        div(".calc-right", [
          h3([`6%`]),
          p([`OF YOUR TAKE HOME PAY WILL BE SPENT ON REPAYMENTS`])
        ]),
        div(".clear")
      ]),
      div(".clear"),
      div(".calc-totals", [
        div(".calc-left", [
          p([`YOUR ANNUAL FEE REPAYMENT WILL BE`]),
          h3([`$4800`])
        ]),
        div(".calc-right", [
          h3([`$29,700`]),
          p([`IS YOUR TOTAL FEE DEBT OVER TERM`])
        ]),
        div(".clear")
      ]),
      div(".clear")
    ]),
    div(".cta-block", [
      div(".cta-box.cta-0", [
        div("#sendtome.cta-button", [
          p([`EMAIL MY CALCULATION`])
        ]),
        div(".clear")
      ]),
      div(".clear"),
      div(".email-box", [
        input("#sendemail", {
          "attributes": {
            "type": "email",
            "name": "sendemail",
            "placeholder": "Email",
            "maxlength": "255"
          },
          "id": {
            "name": "id",
            "value": "sendemail"
          }
        }),
        `
            `,
        input("#button-sendemail", {
          "attributes": {
            "type": "button",
            "value": "SEND"
          },
          "id": {
            "name": "id",
            "value": "button-sendemail"
          }
        }),
        br()
      ]),
      div(".email-status", [
        p([`Your summary has been sent! Please check your email ( allow one minute ).`])
      ])
    ]),
    div(".clear"),
    div("#disclaimer-button", [
      h2([`IMPORTANT INFORMATION`]),
      div(".arr", [
        svg({
          "attributes": {
            "version": "1.1",
            "xmlns": "http://www.w3.org/2000/svg",
            "xlink": "http://www.w3.org/1999/xlink",
            "viewBox": "0 0 1000 1000",
            "width": "100%",
            "height": "100%",
            "enable-background": "new 0 0 1000 00"
          }
        }, [
          g([
            path({
              "attributes": {
                "d": "M10,292l488.8,489l1.1-1.2l1.2,1.2L990,292l-73-73L500,636L83,219L10,292z"
              }
            })
          ])
        ])
      ])
    ]),
    div(".terms-overlay.closed", [
      p([`This tool has been prepared by the Australian Institute of Business Pty Limited ABN 86 009 115 422.`]),
      p([
        b([`WARNING:`]),
        ` This tool should not be relied on to make a decision to commence study and is not intended to be relied on for the purposes of making a decision with relation to FEE-HELP or making any financial decisions. It should not be relied upon as a true representation of any actual FEE-HELP entitlements or repayments, and does not represent your actual take home pay before or after any FEE-HELP deductions.`
      ]),
      p([
        `You need to take into account your own personal objectives, financial situation and needs as this tool only provides hypothetical calculations and is to be used for illustrative purposes only. We cannot and do not guarantee its applicability or accuracy and recommend that you visit the `,
        a({
          "attributes": {
            "href": "http://studyassist.gov.au/sites/studyassist/helppayingmyfees/fee-help/pages/fee-help-"
          }
        }, [`Study Assist website`]),
        ` for any FEE-HELP information. We recommend you consider obtaining personalised advice from qualified professionals regarding all personal financial decisions.`
      ]),
      p([`This tool is current as at 7 July 2017 and is subject to change. To the extent permitted by law, no liability is accepted by the Australian Institute of Business and its related entities, agents, third parties and employees for any loss or damage arising, directly or indirectly from reliance on this tool.`]),
      h2([`How this calculator works`]),
      p([`This calculator is intended as an educational tool. It uses the following assumptions and methodology to provide you with an indication about how much take home pay you may have and any potential shortfall. All examples shown in this tool are illustrative and do not represent an estimate or guarantee. Your take home pay may be very different to any of the outputs generated by this calculator.`]),
      h2([`No individual assumptions:`]),
      p([`This calculator does not take into account your personal eligibility, tax obligations, objectives, your financial situation and needs and other unpredictable events that may alter your weekly take home pay.`]),
      h2([`No tax or CPI assumptions:`]),
      p([`Any amounts are shown in today’s dollars without any tax or CPI considerations or adjustments whatsoever.`]),
      h2([`2017-2018 StudyAssist repayment rates`]),
      p([
        `The calculator used the StudyAssist repayment rates provided in the 2017-2018 table available `,
        a({
          "attributes": {
            "href": "http://studyassist.gov.au/sites/studyassist/payingbackmyloan/loan-repayment/pages/loan-repayment"
          }
        }, [`here`]),
        `.`
      ]),
      h2([`Getting help:`]),
      p([`Don’t make any decisions based on this calculator. Before you make any decisions, you should get information and advice from the Australian Government.`]),
      p([
        `For any information about FEE-HELP, visit the Study Assist website `,
        a({
          "attributes": {
            "href": "http://studyassist.gov.au/sites/studyassist/helppayingmyfees/fee-help/pages/fee-help-"
          }
        }, [`here`]),
        `.`
      ])
    ]),
    div(".clear")
  ]),
  div(".clear")
];