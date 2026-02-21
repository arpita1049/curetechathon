import React from 'react';

interface RiskBadgeProps {
    level: 'Low' | 'Moderate' | 'High' | 'Critical';
}

const RiskBadge: React.FC<RiskBadgeProps> = ({ level }) => {
    const colors = {
        Low: 'bg-emerald-100 text-emerald-700 border-emerald-200',
        Moderate: 'bg-yellow-100 text-yellow-700 border-yellow-200',
        High: 'bg-orange-100 text-orange-700 border-orange-200',
        Critical: 'bg-rose-100 text-rose-700 border-rose-200'
    };

    return (
        <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border ${colors[level]}`}>
            {level} Risk
        </span>
    );
};

export default RiskBadge;
