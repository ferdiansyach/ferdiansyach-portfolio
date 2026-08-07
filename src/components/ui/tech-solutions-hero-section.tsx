"use client";

import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface HaosShowcaseProps {
  bg?: React.ReactNode;
  category?: string;
  year?: string | number;
  solutionLabel?: string;
  solutionValue?: string;
  title?: string;
  subtitle?: string;
  statLabel?: string;
  statValue?: string;
  bottomValue?: string;
  progressPercent?: number;
  statusBadge?: React.ReactNode;
  actions?: React.ReactNode;
  onAction?: () => void;
  className?: string;
}

export default function HaosShowcase({
  bg,
  category = 'CATEGORY',
  year = 'YEAR',
  solutionLabel = 'TECH SOLUTIONS',
  solutionValue = 'AUTOMATION & ROBOTICS',
  title = 'HAOS Tech Solutions',
  subtitle = 'Brand Concept & Identity',
  statLabel = 'HIGH-QUALITY',
  statValue = 'DEVELOPMENT',
  bottomValue = '+2K',
  progressPercent = 60,
  statusBadge,
  actions,
  onAction = () => {},
  className = '',
}: HaosShowcaseProps) {
  return (
    <section
      className={`haos-container ${className}`}
      role="region"
      aria-label="Haos Tech Solutions showcase"
    >
      {/* Background slot */}
      {bg && <div className="haos-bg">{bg}</div>}

      {/* Top Row */}
      <div className="haos-top-row">
        {/* Top Left */}
        <div className="haos-cell haos-top-left">
          {statusBadge && <div className="mb-2">{statusBadge}</div>}
          <span className="haos-label">{category}</span>
          <span className="haos-value">{solutionValue}</span>
        </div>

        {/* Top Center */}
        <div className="haos-cell haos-top-center">
          <span className="haos-label">YEAR</span>
          <span className="haos-value haos-value-white">{year}</span>
        </div>

        {/* Top Right */}
        <div className="haos-cell haos-top-right">
          <span className="haos-label">{solutionLabel}</span>
          <span className="haos-value haos-value-accent">{solutionValue}</span>
        </div>
      </div>

      {/* Main Content Row */}
      <div className="haos-main-row haos-main-row-full">
        {/* Main Content */}
        <div className="haos-main-content">
          <h1 className="haos-title">{title}</h1>
          <h2 className="haos-subtitle">{subtitle}</h2>
          <div className="flex flex-wrap items-center gap-6 mt-2">
            <div className="haos-stats-block">
              <span className="haos-label">{statLabel}</span>
              <div className="haos-stat-value">{statValue}</div>
            </div>
            {actions && <div className="flex flex-wrap items-center gap-3.5 z-10 w-full sm:w-auto">{actions}</div>}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="haos-bottom-row">
        {/* Bottom Left */}
        <div className="haos-bottom-left">
          <div className="haos-bottom-value">{bottomValue}</div>
          <div
            className="haos-progress-track"
            role="progressbar"
            aria-valuenow={progressPercent}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="haos-progress-fill"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="haos-progress-label">{progressPercent}% COMPLETE</span>
        </div>

        {/* Bottom Right */}
        <div className="haos-bottom-right">
          <div
            className="haos-action-icon"
            role="button"
            tabIndex={0}
            aria-label="Perform action"
            onClick={onAction}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                if (onAction) onAction();
              }
            }}
          >
            <ArrowUpRight className="w-7 h-7" />
          </div>
        </div>
      </div>
    </section>
  );
}
