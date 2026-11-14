"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const PLANS = {
  individual: [
    {
      name: "FREE",
      price: 0,
      description: "Para comenzar a organizar tus finanzas.",
      features: [
        "Registro de ingresos y gastos",
        "Resumen financiero básico",
        "Hasta 20 movimientos al mes",
        "Exportación CSV",
      ],
    },
    {
      name: "BASIC",
      price: 99,
      description: "Para comerciantes independientes.",
      features: [
        "Movimientos ilimitados",
        "Resumen mensual",
        "Exportación CSV",
        "Historial financiero organizado",
      ],
    },
    {
      name: "BUSINESS",
      price: 249,
      description: "Para quienes necesitan mayor control.",
      features: [
        "Todo lo incluido en BASIC",
        "Reportes financieros ampliados",
        "Comparación de periodos",
        "Soporte prioritario",
      ],
    },
  ],
  business: [
    {
      name: "FREE",
      price: 0,
      description: "Para pequeños negocios que quieren probar.",
      features: [
        "Registro básico",
        "Hasta 20 movimientos",
        "Resumen de ingresos y gastos",
      ],
    },
    {
      name: "BASIC",
      price: 149,
      description: "Para negocios con actividad constante.",
      features: [
        "Movimientos ilimitados",
        "Reportes mensuales",
        "Exportación CSV",
        "Seguimiento de balance",
      ],
    },
    {
      name: "BUSINESS",
      price: 349,
      description: "Para negocios que necesitan más información.",
      features: [
        "Todo lo incluido en BASIC",
        "Reportes ampliados",
        "Comparación mensual",
        "Soporte prioritario",
      ],
    },
  ],
};

const money = (value) =>
  new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 2,
  }).format(value);

export default function PricingPage() {
  const [segment, setSegment] = useState("individual");

  const [users, setUsers] = useState(100);
  const [conversion, setConversion] = useState(10);
  const [price, setPrice] = useState(99);
  const [costPerUser, setCostPerUser] = useState(10);
  const [fixedCosts, setFixedCosts] = useState(500);

  const [scenarios, setScenarios] = useState([]);
  const [scenarioName, setScenarioName] = useState("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("week14_scenarios");

      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setScenarios(parsed);
        }
      }
    } catch {
      setScenarios([]);
    }
  }, []);

  const safeUsers = Math.max(0, Math.floor(Number(users) || 0));
  const safeConversion = Math.min(
    100,
    Math.max(0, Number(conversion) || 0)
  );
  const safePrice = Math.max(0, Number(price) || 0);
  const safeCostPerUser = Math.max(0, Number(costPerUser) || 0);
  const safeFixedCosts = Math.max(0, Number(fixedCosts) || 0);

  const payingUsers = Math.round(
    safeUsers * (safeConversion / 100)
  );

  const monthlyRevenue = payingUsers * safePrice;
  const annualRevenue = monthlyRevenue * 12;

  const monthlyCosts =
    safeUsers * safeCostPerUser + safeFixedCosts;

  const monthlyProfit = monthlyRevenue - monthlyCosts;
  const annualProfit = monthlyProfit * 12;

  function saveScenario() {
    const name = scenarioName.trim();

    if (!name) {
      alert("Escribe un nombre para el escenario.");
      return;
    }

    if (name.length > 60) {
      alert("El nombre no puede superar 60 caracteres.");
      return;
    }

    const newScenario = {
      id: Date.now().toString(),
      name,
      segment,
      users: safeUsers,
      conversion: safeConversion,
      price: safePrice,
      costPerUser: safeCostPerUser,
      fixedCosts: safeFixedCosts,
      monthlyRevenue,
      annualRevenue,
      monthlyProfit,
    };

    const updated = [...scenarios, newScenario].slice(-20);

    setScenarios(updated);
    localStorage.setItem(
      "week14_scenarios",
      JSON.stringify(updated)
    );

    setScenarioName("");
  }

  function loadScenario(scenario) {
    setSegment(scenario.segment);
    setUsers(scenario.users);
    setConversion(scenario.conversion);
    setPrice(scenario.price);
    setCostPerUser(scenario.costPerUser);
    setFixedCosts(scenario.fixedCosts);
  }

  function deleteScenario(id) {
    const updated = scenarios.filter(
      (scenario) => scenario.id !== id
    );

    setScenarios(updated);
    localStorage.setItem(
      "week14_scenarios",
      JSON.stringify(updated)
    );
  }

  const card = {
    background: "white",
    padding: "24px",
    borderRadius: "16px",
    border: "1px solid #dbe4e8",
    boxShadow: "0 4px 15px rgba(0,0,0,0.04)",
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    border: "1px solid #cbd5e1",
    borderRadius: "8px",
    marginTop: "6px",
    color: "#0f172a",
    background: "#ffffff",
  };

  const buttonStyle = {
    background: "#0f766e",
    color: "white",
    padding: "12px 20px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f1f5f9",
        padding: "30px 18px",
        color: "#0f172a",
      }}
    >
      <div style={{ maxWidth: "1150px", margin: "auto" }}>
        <header style={{ marginBottom: "35px" }}>
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
              marginTop: "12px",
            }}
          >
            Precios que reflejan valor
          </h1>

          <p style={{ color: "#64748b", marginTop: "12px" }}>
            WEEK 14 — PRICING: THE NUMBER THAT TELLS THE TRUTH
          </p>

          <p style={{ marginTop: "15px", maxWidth: "750px" }}>
            Ayudamos a comerciantes mexicanos a organizar
            sus ingresos y gastos para construir un historial
            financiero más claro.
          </p>

          <div
            style={{
              display: "flex",
              gap: "18px",
              marginTop: "20px",
              flexWrap: "wrap",
            }}
          >
            <Link href="/">Inicio</Link>
            <Link href="/about">Análisis 10:1</Link>
          </div>
        </header>

        <section style={{ marginBottom: "40px" }}>
          <h2 style={{ fontSize: "26px", fontWeight: "bold" }}>
            Elige tu tipo de cliente
          </h2>

          <div
            style={{
              display: "flex",
              gap: "12px",
              marginTop: "20px",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={() => {
                setSegment("individual");
                setPrice(99);
              }}
              style={{
                ...buttonStyle,
                background:
                  segment === "individual"
                    ? "#0f766e"
                    : "#64748b",
              }}
            >
              Comerciante independiente
            </button>

            <button
              onClick={() => {
                setSegment("business");
                setPrice(149);
              }}
              style={{
                ...buttonStyle,
                background:
                  segment === "business"
                    ? "#0f766e"
                    : "#64748b",
              }}
            >
              Pequeño negocio
            </button>
          </div>
        </section>

        <section
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "20px",
            marginBottom: "50px",
          }}
        >
          {PLANS[segment].map((plan) => (
            <div key={plan.name} style={card}>
              <h3
                style={{
                  color: "#0f766e",
                  fontSize: "22px",
                  fontWeight: "bold",
                }}
              >
                {plan.name}
              </h3>

              <p
                style={{
                  fontSize: "32px",
                  fontWeight: "bold",
                  marginTop: "20px",
                }}
              >
                {money(plan.price)}
              </p>

              <p style={{ color: "#64748b" }}>
                por mes
              </p>

              <p style={{ marginTop: "18px" }}>
                {plan.description}
              </p>

              <ul
                style={{
                  marginTop: "20px",
                  paddingLeft: "20px",
                  lineHeight: "2",
                }}
              >
                {plan.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>

              <button
                onClick={() => setPrice(plan.price)}
                style={{
                  ...buttonStyle,
                  width: "100%",
                  marginTop: "25px",
                }}
              >
                Simular este precio
              </button>
            </div>
          ))}
        </section>

        <section style={card}>
          <h2
            style={{
              fontSize: "28px",
              fontWeight: "bold",
              marginBottom: "12px",
            }}
          >
            Simulador de ingresos
          </h2>

          <p style={{ color: "#64748b" }}>
            Cambia los valores para estimar los ingresos
            y costos de Financial Evidence Passport.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "20px",
              marginTop: "30px",
            }}
          >
            {[
              {
                label: "Usuarios totales",
                value: users,
                setter: setUsers,
                max: 1000000,
              },
              {
                label: "Conversión a pago (%)",
                value: conversion,
                setter: setConversion,
                max: 100,
              },
              {
                label: "Precio mensual (MXN)",
                value: price,
                setter: setPrice,
                max: 100000,
              },
              {
                label: "Costo por usuario (MXN)",
                value: costPerUser,
                setter: setCostPerUser,
                max: 100000,
              },
              {
                label: "Costos fijos mensuales (MXN)",
                value: fixedCosts,
                setter: setFixedCosts,
                max: 10000000,
              },
            ].map((field) => (
              <label key={field.label}>
                <strong>{field.label}</strong>

                <input
                  type="number"
                  min="0"
                  max={field.max}
                  step="any"
                  value={field.value}
                  onChange={(event) =>
                    field.setter(
                      Math.min(
                        field.max,
                        Math.max(
                          0,
                          Number(event.target.value) || 0
                        )
                      )
                    )
                  }
                  style={inputStyle}
                />
              </label>
            ))}
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(210px, 1fr))",
              gap: "18px",
              marginTop: "35px",
            }}
          >
            {[
              {
                title: "Usuarios de pago",
                value: payingUsers,
              },
              {
                title: "Ingresos mensuales",
                value: money(monthlyRevenue),
              },
              {
                title: "Ingresos anuales",
                value: money(annualRevenue),
              },
              {
                title: "Costos mensuales",
                value: money(monthlyCosts),
              },
              {
                title: "Resultado mensual estimado",
                value: money(monthlyProfit),
              },
              {
                title: "Resultado anual estimado",
                value: money(annualProfit),
              },
            ].map((result) => (
              <div
                key={result.title}
                style={{
                  background: "#f0fdfa",
                  padding: "20px",
                  borderRadius: "12px",
                }}
              >
                <p style={{ color: "#475569" }}>
                  {result.title}
                </p>

                <h3
                  style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    marginTop: "10px",
                  }}
                >
                  {result.value}
                </h3>
              </div>
            ))}
          </div>

          <p
            style={{
              marginTop: "25px",
              fontSize: "13px",
              color: "#64748b",
            }}
          >
            Supuestos: los usuarios de pago se redondean
            al entero más cercano. Los ingresos anuales
            equivalen a 12 meses constantes. Los costos
            son estimaciones editables. No se incluyen
            impuestos, comisiones de cobro ni cancelaciones.
            Las cifras son simuladas y no representan ventas reales.
          </p>
        </section>

        <section style={{ ...card, marginTop: "30px" }}>
          <h2
            style={{
              fontSize: "25px",
              fontWeight: "bold",
            }}
          >
            Guardar escenarios
          </h2>

          <p
            style={{
              color: "#64748b",
              marginTop: "10px",
            }}
          >
            Compara distintas estrategias de precios.
          </p>

          <div
            style={{
              display: "flex",
              gap: "12px",
              marginTop: "20px",
              flexWrap: "wrap",
            }}
          >
            <input
              type="text"
              maxLength={60}
              placeholder="Ej. Escenario conservador"
              value={scenarioName}
              onChange={(event) =>
                setScenarioName(event.target.value)
              }
              style={{
                ...inputStyle,
                maxWidth: "350px",
                marginTop: 0,
              }}
            />

            <button
              onClick={saveScenario}
              style={buttonStyle}
            >
              Guardar escenario
            </button>
          </div>

          {scenarios.length === 0 ? (
            <p style={{ marginTop: "25px", color: "#64748b" }}>
              Todavía no hay escenarios guardados.
            </p>
          ) : (
            <div style={{ marginTop: "25px" }}>
              {scenarios.map((scenario) => (
                <div
                  key={scenario.id}
                  style={{
                    padding: "18px",
                    borderBottom: "1px solid #e2e8f0",
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "15px",
                    flexWrap: "wrap",
                  }}
                >
                  <div>
                    <strong>{scenario.name}</strong>

                    <p style={{ color: "#64748b" }}>
                      {scenario.users} usuarios ·{" "}
                      {scenario.conversion}% conversión
                    </p>

                    <p>
                      Ingreso mensual:{" "}
                      {money(scenario.monthlyRevenue)}
                    </p>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      alignItems: "center",
                    }}
                  >
                    <button
                      onClick={() => loadScenario(scenario)}
                      style={buttonStyle}
                    >
                      Cargar
                    </button>

                    <button
                      onClick={() =>
                        deleteScenario(scenario.id)
                      }
                      style={{
                        ...buttonStyle,
                        background: "#dc2626",
                      }}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <p
            style={{
              marginTop: "20px",
              fontSize: "12px",
              color: "#64748b",
            }}
          >
            Los escenarios se guardan únicamente en este
            navegador mediante localStorage. No se sincronizan
            entre dispositivos ni se almacenan en una cuenta.
          </p>
        </section>

        <footer
          style={{
            textAlign: "center",
            marginTop: "50px",
            color: "#64748b",
            fontSize: "13px",
          }}
        >
          <p>
            Financial Evidence Passport · México · Week 14
          </p>

          <p style={{ marginTop: "8px" }}>
            Los precios son propuestas académicas.
            No existe un sistema de cobro activo.
          </p>
        </footer>
      </div>
    </main>
  );
}
