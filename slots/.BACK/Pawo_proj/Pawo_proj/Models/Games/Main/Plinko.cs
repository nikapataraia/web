namespace Pawo_proj.Models.Games.Main
{
    public class Plinko
    {
        private FinishLineManager finishLineManager= new FinishLineManager();
        List<Ball> balls = new List<Ball>();

        public Plinko() { 

        }

        public void addBall(int Bet)
        {
            Ball newball = new Ball(finishLineManager.getFinish(), Bet, 0);
            balls.Add(newball);
        }

        public int cashoutball(int id)
        {
            var ball = balls.FirstOrDefault(b => b.getID() == id);
            if (ball != null)
            {
                balls.Remove(ball);
                return ball.getBetAmount();
            }
            return 0;
        }
    }
}
