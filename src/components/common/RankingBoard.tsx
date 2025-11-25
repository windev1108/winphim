'use client';
import { Icon, Icons } from '@/assets/icons';
import { cn } from '@/lib/utils';
import React from 'react';
import NumberMotion from '../motion/number-motion';
import { useTranslations } from 'next-intl';

export interface RankingItem {
    product: string;
    quantity: number;
    price: number;
}

interface RankingTableProps {
    data?: RankingItem[];
    fullWidth?: boolean
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl'
}

const MAPPING_RANK_PROPERTY: Record<number, { icon: Icon, color: string }> = {
    1: {
        icon: Icons.rank1,
        color: '#FFC83D10'
    },
    2: {
        icon: Icons.rank2,
        color: 'CACACA10'
    },
    3: {
        icon: Icons.rank3,
        color: '#99735A10'
    },
}

const RankingBoard: React.FC<RankingTableProps> = ({ fullWidth = true, maxWidth = '4xl', data = [] }) => {
    const t = useTranslations()
    const formatNumber = (num: number): string => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    const formatPrice = (price: number): string => {
        return `$ ${formatNumber(price)}`;
    };

    return (
        <div className={cn(`w-full mx-auto italic`, {
            fullWidth: `max-w-${maxWidth}`
        })}>
            {/* Header */}
            <div className="flex justify-between gap-6 px-6 py-4 h-10 mb-2">
                <div className="text-neutral-500 text-xs font-semibold uppercase tracking-wider">
                    {`${t('no')}.`}
                </div>
                <div className="text-neutral-500 text-xs font-semibold uppercase tracking-wider">
                    {t('products')}
                </div>
                <div className="text-neutral-500 text-xs font-semibold uppercase tracking-wider">
                    {t('quantity')}
                </div>
                <div className="text-neutral-500 text-xs font-semibold uppercase tracking-wider text-right">
                    {t('price')}
                </div>
            </div>

            <div className="space-y-3">
                {data.map((item, index) => {
                    const rank = index + 1;
                    const Icon = MAPPING_RANK_PROPERTY[rank]?.icon ?? null;
                    const bgColor = MAPPING_RANK_PROPERTY[rank]?.color ?? '#59595910';

                    return (
                        <div
                            key={index}
                            className='bg-secondary-800 rounded-[14px] overflow-hidden'

                        >
                            <div
                                className={`bg-linear-to-r from-[${bgColor}] from-5% to-[#1F202300] to-95% transition-all duration-200 xl:py-4 xl:px-6 px-3 py-3`}
                            >
                                <div className="flex justify-between gap-6 items-center">
                                    {/* Rank Icon/Number */}
                                    <div className="flex items-center justify-center">
                                        {Icon ? (
                                            <div className="flex items-center justify-center">
                                                <Icon className='xl:w-10 w-5 xl:h-10 h-5' />
                                            </div>
                                        ) : (
                                            <div className="xl:w-10 w-5 xl:h-10 h-5 italic  rounded-xl flex items-center justify-center text-primary-200 font-bold text-xl">
                                                {rank}
                                            </div>
                                        )}
                                    </div>

                                    {/* Product Name */}
                                    <div className="flex items-center">
                                        <span className="text-neutral-0 font-bold xl:text-base text-[10px] tracking-wide text-nowrap">
                                            {item.product}
                                        </span>
                                    </div>

                                    {/* Quantity */}
                                    <div className="flex items-center">
                                        <span className="text-neutral-0 font-medium xl:text-base text-[10px]">
                                            <NumberMotion
                                                compact={false}
                                                showDecimal={false}
                                                value={item.quantity}
                                            />
                                        </span>
                                    </div>

                                    {/* Price */}
                                    <div className="flex items-center justify-end bg-neutral-100 xl:py-2.5 py-2 xl:px-4 px-2 xl:rounded-2xl rounded-lg">
                                        <span className="text-yellow-400 font-bold xl:text-base text-[10px] text-nowrap">
                                            {formatPrice(item.price)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default RankingBoard
