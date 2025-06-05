export type TPlayer = {
  id: string;
  login: string;
  rating: number;
};

export type TGameIdle = {
  id: string;
  creator: TPlayer;
  field: TField;
  status: 'idle';
};
export type TGameOver = {
  id: string;
  players: TPlayer[];
  status: 'gameOver';
  field: TField;
  isDraw?: boolean;
  winnerId: TPlayer;
};
export type TGameInProgress = {
  id: string;
  players: TPlayer[];
  status: 'inProgress';
  field: TField;
};

export type TGameOverDraw = {
  id: string;
  players: TPlayer[];
  status: 'gameOverDraw';
  field: TField;
};

export type TGameSymbol = string;
export type TCell = TGameSymbol | null;
export type TField = TCell[];

export type TGame = TGameIdle | TGameInProgress | TGameOver | TGameOverDraw;
