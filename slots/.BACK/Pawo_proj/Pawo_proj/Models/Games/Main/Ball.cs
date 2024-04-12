namespace Pawo_proj.Models.Games.Main
{
    public class Ball
    {
        private int BetAmount;
        private int Finisher;
        private int ID;
        private int Type;
        private static int id = 0;
        public Ball(int bet, int finisher, int type = 0)
        {
            this.BetAmount = bet;
            this.Finisher = finisher;
            ID = id;
            Type = type;
            id++;
        }

    }
}
