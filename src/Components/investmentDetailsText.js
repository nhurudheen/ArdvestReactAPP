const InvestmentDetailsText = ({title, text}) => {
    return (
        <div className="grid pb-6">
            <span className="text-[10px]">{title}</span>
            <span className="font-semibold text-sm">{text}</span>
        </div>
    );
}

export default InvestmentDetailsText;