import Image from 'next/image';
import Bronze from "public/rankIcons/emblem-bronze.png";
import Silver from "public/rankIcons/emblem-silver.png";
import Iron from "public/rankIcons/emblem-iron.png";
import Gold from "public/rankIcons/emblem-gold.png";
import Platinum from "public/rankIcons/emblem-platinum.png";
import Diamond from "public/rankIcons/emblem-diamond.png";
import Challenger from "public/rankIcons/emblem-challenger.png";
import GrandMaster from "public/rankIcons/emblem-grandmaster.png";
import Master from "public/rankIcons/emblem-master.png";
import { IProfile } from '../IProfile';

interface RankQueue {
    tier: string,
}

export default function RankImage({tier}: RankQueue) {

    if (tier == 'CHALLENGER') {
        return (
            <Image
                alt='Challenger'
                src={Challenger}
                width={50}
                height={50}
                style={{ marginLeft: 5 }}
            />
        )
    } else if (tier == 'GRANDMASTER') {
        return (
            <Image
                alt='Grandmaster'
                src={GrandMaster}
                width={50}
                height={50}
                style={{ marginLeft: 5 }}
            />
        )
    } else if (tier == 'MASTER') {
        return (
            <Image
                alt='Master'
                src={Master}
                width={50}
                height={50}
                style={{ marginLeft: 5 }}
            />
        )
    } else if (tier == 'DIAMOND') {
        return (
            <Image
                alt='Diamond'
                src={Diamond}
                width={50}
                height={50}
                style={{ marginLeft: 5 }}
            />
        )
    } else if (tier == 'PLATINUM') {
        console.log(tier);
        return (
            <Image
                alt='Platinum'
                src={Platinum}
                width={50}
                height={50}
                style={{ marginLeft: 5 }}
            />
        )
    } else if (tier == 'GOLD') {
        return (
            <Image
                alt='Gold'
                src={Gold}
                width={50}
                height={50}
                style={{ marginLeft: 5 }}
            />
        )
    } else if (tier == 'SILVER') {
        return (
            <Image
                alt='Silver'
                src={Silver}
                width={50}
                height={50}
                style={{ marginLeft: 5 }}
            />
        )
    } else if (tier == 'BRONZE') {
        return (
            <Image
                alt='Bronze'
                src={Bronze}
                width={50}
                height={50}
                style={{ marginLeft: 5 }}
            />
        )
    } else if (tier == 'IRON') {
        return (
            <Image
                alt='Iron'
                src={Iron}
                width={50}
                height={50}
                style={{ marginLeft: 5 }}
            />
        )
    } else return null
}