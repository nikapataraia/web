interface changeprops{
    amount:number;
    won : boolean;
    isvisible:boolean;
}

const Moneychangeanimation: React.FC<changeprops> = ({amount,won,isvisible}) =>{

    return (
        <div 
        className={`moneychangeanimation-container 
        ${won ? 'animation-won' : 'animation-lost'}
        ${isvisible ? 'animation-visible' : ''}`}>
        {amount}$
      </div>
    )
}

export default Moneychangeanimation