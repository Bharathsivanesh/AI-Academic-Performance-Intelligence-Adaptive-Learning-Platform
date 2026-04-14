"use client";

import React, { useEffect, useState } from "react";
import StudyPlanCard from "./components/StudyPlanCard";
import CreateCustomPlan from "./components/CreateCustomPlan";
import StudyPlanTimeline from "./components/PlanHistorySection";
import { apiService } from "../../service/Apicall";
import Loader from "../../components/Loader";
import { showToast } from "../../components/Notification";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

// ── Empty state ──────────────────────────────────────────────
const EmptyPlans = ({ onCreateClick }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "18px",
      padding: "56px 24px",
      margin: "0 0 1.5rem",
      borderRadius: "20px",
      border: "1.5px dashed #1e3a5a",
      background:
        "radial-gradient(ellipse at 50% 0%, rgba(37,99,235,0.07) 0%, transparent 70%)",
      textAlign: "center",
    }}
  >
    {/* Animated icon ring */}
    <div
      style={{
        width: "76px",
        height: "76px",
        borderRadius: "50%",
        background: "rgba(91,156,246,0.08)",
        border: "1.5px solid rgba(91,156,246,0.18)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        animation: "pulse-ring 2.4s ease-in-out infinite",
      }}
    >
      <AutoStoriesIcon style={{ fontSize: "32px", color: "#5b9cf6" }} />
    </div>

    <div>
      <p
        style={{
          fontSize: "16px",
          fontWeight: "600",
          color: "#c8d9f0",
          margin: "0 0 6px",
          letterSpacing: "0.01em",
        }}
      >
        No study plans yet
      </p>
      <p
        style={{
          fontSize: "13px",
          color: "#4a6a9a",
          margin: 0,
          maxWidth: "300px",
          lineHeight: 1.6,
        }}
      >
        Create your first custom study plan to start tracking your progress and
        staying on top of your subjects.
      </p>
    </div>

    <button
      onClick={onCreateClick}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "7px",
        padding: "10px 22px",
        borderRadius: "12px",
        background: "linear-gradient(90deg, #2563eb, #4f46e5)",
        color: "#fff",
        fontSize: "13px",
        fontWeight: "500",
        border: "none",
        cursor: "pointer",
        transition: "opacity 0.2s, transform 0.15s",
        marginTop: "4px",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.opacity = "0.88";
        e.currentTarget.style.transform = "translateY(-1px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.opacity = "1";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <AddCircleOutlineIcon style={{ fontSize: "16px" }} />
      Create your first plan
    </button>
  </div>
);

// ────────────────────────────────────────────────────────────
const PlanDetails = () => {
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const VISIBLE_CARDS = 3;

  const fetchPlans = () => {
    setIsLoading(true);
    apiService({
      endpoint: "/api/study-plans/",
      method: "GET",
      onSuccess: (res) => {
        setPlans(res);
        if (res.length > 0) setSelectedPlan(res[0]);
        setIsLoading(false);
      },
      onError: (err) => {
        console.error(err);
        showToast("Failed to load study plans!", "error");
        setIsLoading(false);
      },
    });
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const canPrev = carouselIndex > 0;
  const canNext = carouselIndex < plans.length - VISIBLE_CARDS;

  const handlePlanCreated = () => {
    fetchPlans();
    setIsModalOpen(false);
  };

  const hasPlans = plans.length > 0;
  // Only show empty state after loading is done and no plans exist
  const showEmpty = !isLoading && plans.length === 0;

  return (
    <div className="spd-page">
      {/* ── Header ── */}
      {/* <div className="spd-top-bar">
        <span className="spd-section-label">Recent Study Plans</span>
        <button className="spd-view-all">View all history →</button>
      </div> */}

      {/* ── Carousel (only when plans exist) ── */}
      {hasPlans && (
        <div className="spd-carousel-wrap">
          <button
            className="spd-arrow-btn group"
            disabled={!canPrev}
            onClick={() => setCarouselIndex((i) => i - 1)}
          >
            <ArrowBackIosNewIcon
              className="text-blue-300 group-hover:text-blue-400 group-hover:scale-110 transition-all duration-200"
              style={{ fontSize: "16px" }}
            />
          </button>

          <div className="spd-track-outer">
            <div
              className="spd-track"
              style={{
                transform: `translateX(calc(-${carouselIndex} * (272px + 12px)))`,
              }}
            >
              {plans.map((plan) => {
                const isActive = selectedPlan?.id === plan.id;
                return (
                  <div
                    key={plan.id}
                    onClick={() => setSelectedPlan(plan)}
                    className={`spd-card-wrapper ${isActive ? "spd-card-active" : ""}`}
                  >
                    <StudyPlanCard
                      subject={`Subject ${plan.subject}`}
                      title={plan.plan_name}
                      progress={plan.overall_progress}
                      status={plan.status}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <button
            className="spd-arrow-btn group"
            disabled={!canNext}
            onClick={() => setCarouselIndex((i) => i + 1)}
          >
            <ArrowForwardIosIcon
              className="text-blue-300 group-hover:text-blue-400 transition"
              style={{ fontSize: "16px" }}
            />
          </button>
        </div>
      )}

      {/* ── Empty State ── */}
      {showEmpty && <EmptyPlans onCreateClick={() => setIsModalOpen(true)} />}

      {/* ── Create Plan Button (hidden when empty state shows its own CTA) ── */}
      {hasPlans && (
        <div className="px-10" style={{ marginBottom: "1.5rem" }}>
          <button
            onClick={() => setIsModalOpen(true)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 22px",
              borderRadius: "12px",
              background: "linear-gradient(90deg, #2563eb, #4f46e5)",
              color: "#fff",
              fontSize: "14px",
              fontWeight: "500",
              border: "none",
              cursor: "pointer",
              transition: "opacity 0.2s, transform 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "0.88";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "1";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            ⚡ Create Custom Plan
          </button>
        </div>
      )}

      {/* ── Modal Overlay ── */}
      {isModalOpen && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsModalOpen(false);
          }}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.65)",
            backdropFilter: "blur(4px)",
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: "#0d1e35",
              border: "1px solid #1e3050",
              borderRadius: "20px",
              padding: "28px",
              width: "90%",
              maxWidth: "480px",
              animation: "modalIn 0.22s cubic-bezier(0.4,0,0.2,1)",
              position: "relative",
            }}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              style={{
                position: "absolute",
                top: "16px",
                right: "18px",
                background: "none",
                border: "none",
                color: "#5b9cf6",
                fontSize: "20px",
                cursor: "pointer",
                lineHeight: 1,
              }}
            >
              ✕
            </button>

            <CreateCustomPlan refreshPlans={handlePlanCreated} />
          </div>
        </div>
      )}

      {/* ── Timeline ── */}
      {selectedPlan && (
        <StudyPlanTimeline plan={selectedPlan} refreshPlans={fetchPlans} />
      )}

      <Loader isLoading={isLoading} message="Loading study plans..." />

      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.94) translateY(12px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }

        @keyframes pulse-ring {
          0%, 100% { box-shadow: 0 0 0 0px rgba(91,156,246,0.18); }
          50%       { box-shadow: 0 0 0 10px rgba(91,156,246,0.0); }
        }

        .spd-page {
          width: 100%;
          padding: 1.75rem 1.5rem;
          min-height: 100vh;
          background: #07111f;
          font-family: 'DM Sans', 'Segoe UI', sans-serif;
        }

        .spd-top-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.1rem;
        }
        .spd-section-label {
          font-size: 11px;
          letter-spacing: 0.13em;
          color: #4a6a9a;
          text-transform: uppercase;
        }
        .spd-view-all {
          font-size: 13px;
          color: #5b9cf6;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
        }
        .spd-view-all:hover { text-decoration: underline; }

        .spd-carousel-wrap {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 1.5rem;
        }
        .spd-arrow-btn {
          flex-shrink: 0;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          border: 1px solid #1e3050;
          background: #0d1e35;
          color: #8ab4e8;
          cursor: pointer;
          font-size: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.15s, border-color 0.15s;
        }
        .spd-arrow-btn:hover:not(:disabled) {
          background: #162a44;
          border-color: #5b9cf6;
        }
        .spd-arrow-btn:disabled {
          opacity: 0.25;
          cursor: default;
        }
        .spd-track-outer {
          overflow: hidden;
          flex: 1;
        }
        .spd-track {
          display: flex;
          gap: 12px;
          transition: transform 0.38s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .spd-card-wrapper {
          flex: 0 0 272px;
          cursor: pointer;
          border-radius: 16px;
          border: 1.5px solid transparent;
          transition: border-color 0.2s, transform 0.18s ease, box-shadow 0.2s;
        }
        .spd-card-wrapper:hover {
          border-color: #2a4a7a;
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(91, 156, 246, 0.13);
        }
        .spd-card-active {
          border-color: #5b9cf6 !important;
          box-shadow: 0 0 0 3px rgba(91, 156, 246, 0.18),
                      0 8px 24px rgba(91, 156, 246, 0.15) !important;
          transform: translateY(-4px);
        }
      `}</style>
    </div>
  );
};

export default PlanDetails;
