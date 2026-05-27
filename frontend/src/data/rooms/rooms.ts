// rooms.ts - 研究室各部屋の定義

import type { Room } from '../../types/game';

// 研究室各部屋のデータ
export const LAB_ROOMS: Room[] = [
  {
    id: "main_room",
    name: "メインルーム",
    description: "研究室のメインルーム。学生たちが日常的に使用する作業スペース。研究活動の中心となる場所。",
    imageUrl: "/images/room/placeholder.svg"
  },
  {
    id: "seminar_room_large",
    name: "セミナールーム",
    description: "大きな講義室。ゼミや発表会で使用される。",
    imageUrl: "/images/room/placeholder.svg"
  },
  {
    id: "meeting_room_small",
    name: "ミーティングルーム",
    description: "小さな講義室。少人数でのミーティングや個別指導に使用される。",
    imageUrl: "/images/room/placeholder.svg"
  },
  {
    id: "quiet_room",
    name: "自習室",
    description: "研究室の一室。静かな環境で集中して作業できる。",
    imageUrl: "/images/room/placeholder.svg"
  },
  {
    id: "experiment_room",
    name: "実験室",
    description: "研究室の一室。実験や研究活動に使用される。",
    imageUrl: "/images/room/placeholder.svg"
  },
  {
    id: "professor_office_entrance",
    name: "教授部屋前",
    description: "教授の研究室の前。先生との面談や相談の際に使用される。",
    imageUrl: "/images/room/placeholder.svg"
  },
  {
    id: "discussion_room",
    name: "ディスカッションルーム",
    description: "研究室の一室。グループワークや議論に適した環境。",
    imageUrl: "/images/room/placeholder.svg"
  },
  {
    id: "lounge",
    name: "コモンスペース",
    description: "研究室の共有スペース。ミーティングや運営会議、学生たちの憩いの場として使用される。",
    imageUrl: "/images/room/placeholder.svg"
  }
];

// 特定の部屋を取得する関数
export function getRoomById(id: string): Room | undefined {
  return LAB_ROOMS.find(room => room.id === id);
}

// 全部屋を取得する関数
export function getAllRooms(): Room[] {
  return LAB_ROOMS;
}