import Link from "next/link";

const money = (value) =>
  new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(value);

export default function AboutPage() {
  // Hypothetical assumptions for academic analysis.
  const hoursPerMonth = 4;
  const hourlyValue = 75;
  const monthlyRiskCost = 0;
  const currentCost = hoursPerMonth * hourlyValue + monthlyRiskCost;

  const basicPrice = 99;
  const businessPrice = 149;

  const basicRatio = currentCost / basicPrice;
  const businessRatio = currentCost / businessPrice;

  const card = {
    background: "#ffffff",
    padding: "25px",
    borderRadius: "16px",
    border: "1px solid #dbe4e8",
    marginBottom: "20px",
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f1f5f9",
        color: "#0f172a",
        padding: "35px 20px",
      }}
    >
      <div style={{ maxWidth: "900px", margin: "auto" }}>
        <p
          style={{
            color: "#0f766e",
            fontWeight: "bold",
            letterSpacing: "2px",
          }}
        >
          FINANCIAL EVIDENCE PASSPORT
        </p>

        <h1
          style={{
            fontSize: "38px",
            fontWeight: "bold",
            marginTop: "15px",
          }}
        >
          The 10:1 Value Memo
        </h1>

        <p style={{ color: "#64748b", marginTop: "10px" }}>
          WEEK 14 — PRICING | OPERATOR
        </p>

        <nav
          style={{
            display: "flex",
            gap: "20px",
            marginTop: "20px",
            marginBottom: "35px",
          }}
        >
          <Link href="/">Inicio</Link>
          <Link href="/pricing">Ver precios</Link>
        </nav>

        <section style={card}>
          <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>
            1. The Customer's Current Workaround
          </h2>

          <p style={{ marginTop: "15px", lineHeight: "1.8" }}>
            Many informal merchants in Mexico manage their
            finances using notebooks, spreadsheets, WhatsApp
            messages, paper receipts, or memory.
          </p>

          <p style={{ marginTop: "12px", lineHeight: "1.8" }}>
            These methods may be inexpensive, but information
            can become scattered, difficult to review, and
            time-consuming to organize.
          </p>
        </section>

        <section style={card}>
          <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>
            2. The Cost of Doing Nothing
          </h2>

          <p style={{ marginTop: "15px", lineHeight: "1.8" }}>
            We estimate the monthly cost of the customer's
            current workaround using the following assumptions:
          </p>

          <div
            style={{
              background: "#f0fdfa",
              padding: "20px",
              borderRadius: "12px",
              marginTop: "20px",
              lineHeight: "2",
            }}
          >
            <p>Time spent organizing records: {hoursPerMonth} hours/month</p>
            <p>Estimated value of time: {money(hourlyValue)}/hour</p>
            <p>Quantified risk cost: {money(monthlyRiskCost)}/month</p>

            <h3
              style={{
                fontSize: "26px",
                fontWeight: "bold",
                marginTop: "15px",
              }}
            >
              Estimated monthly workaround cost: {money(currentCost)}
            </h3>
          </div>

          <p
            style={{
              color: "#64748b",
              fontSize: "13px",
              marginTop: "15px",
            }}
          >
            These figures are hypothetical assumptions, not
            verified customer data. The risk cost is set to
            zero because we do not yet have reliable evidence
            to quantify it.
          </p>
        </section>

        <section style={card}>
          <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>
            3. Our Pricing Proposal
          </h2>

          <p style={{ marginTop: "15px", lineHeight: "1.8" }}>
            Financial Evidence Passport proposes a free entry
            plan and paid plans for merchants who need more
            financial organization.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "15px",
              marginTop: "20px",
            }}
          >
            {[
              { name: "FREE", price: 0 },
              { name: "BASIC — Individual", price: 99 },
              { name: "BASIC — Business", price: 149 },
            ].map((plan) => (
              <div
                key={plan.name}
                style={{
                  padding: "20px",
                  background: "#f0fdfa",
                  borderRadius: "12px",
                }}
              >
                <strong>{plan.name}</strong>
                <p
                  style={{
                    fontSize: "25px",
                    fontWeight: "bold",
                    marginTop: "10px",
                  }}
                >
                  {money(plan.price)}
                </p>
                <p>per month</p>
              </div>
            ))}
          </div>

          <p style={{ marginTop: "18px", lineHeight: "1.8" }}>
            These are proposed prices for testing, not
            validated willingness-to-pay results. The
            application does not currently process payments.
          </p>
        </section>

        <section style={card}>
          <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>
            4. Does Our Value Reach 10:1?
          </h2>

          <p style={{ marginTop: "15px", lineHeight: "1.8" }}>
            The 10:1 test compares the estimated cost of the
            customer's current workaround with our monthly
            subscription price.
          </p>

          <div
            style={{
              background: "#f0fdfa",
              padding: "20px",
              borderRadius: "12px",
              marginTop: "20px",
              lineHeight: "2",
            }}
          >
            <p>
              Individual BASIC: {money(currentCost)} ÷{" "}
              {money(basicPrice)} ={" "}
              <strong>{basicRatio.toFixed(2)}:1</strong>
            </p>

            <p>
              Business BASIC: {money(currentCost)} ÷{" "}
              {money(businessPrice)} ={" "}
              <strong>{businessRatio.toFixed(2)}:1</strong>
            </p>
          </div>

          <p style={{ marginTop: "18px", lineHeight: "1.8" }}>
            Our current assumptions do not support a 10:1
            value claim. This is an important finding:
            we must demonstrate measurable time savings
            and validate willingness to pay before
            claiming stronger customer value.
          </p>

          <p style={{ marginTop: "12px", lineHeight: "1.8" }}>
            The estimated workaround cost is not the same
            as proven savings. Actual savings depend on
            how much time the product eliminates.
          </p>
        </section>

        <section style={card}>
          <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>
            5. The Operator's Decision
          </h2>

          <p style={{ marginTop: "15px", lineHeight: "1.8" }}>
            As the OPERATOR, my priority is to make the
            first customer experience simple, reliable,
            and measurable.
          </p>

          <p style={{ marginTop: "12px", lineHeight: "1.8" }}>
            Before scaling to 100 users, we need to test
            onboarding, identify the most common errors,
            estimate support costs, and verify that
            merchants can consistently organize their
            records without assistance.
          </p>

          <p style={{ marginTop: "12px", lineHeight: "1.8" }}>
            We will not claim that the product guarantees
            loans, credit approval, or financial eligibility.
            Users should understand how their data is
            stored and should not be asked to upload
            sensitive financial information during demos.
          </p>
        </section>

        <section style={card}>
          <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>
            6. What We Must Validate
          </h2>

          <ul
            style={{
              paddingLeft: "25px",
              marginTop: "15px",
              lineHeight: "2",
            }}
          >
            <li>
              How much time does a merchant currently spend
              organizing financial records?
            </li>
            <li>
              How much time does our product actually save?
            </li>
            <li>
              Would a prospective customer pay MXN 99 or
              MXN 149 per month?
            </li>
            <li>
              What would cause the customer to cancel?
            </li>
            <li>
              Can the service support 100 users without
              excessive manual assistance?
            </li>
          </ul>
        </section>

        <footer
          style={{
            textAlign: "center",
            color: "#64748b",
            marginTop: "35px",
            fontSize: "13px",
          }}
        >
          Financial Evidence Passport · Week 14 · Pricing
        </footer>
      </div>
    </main>
  );
}
