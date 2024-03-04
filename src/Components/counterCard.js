const CounterCard = ({title, number, bgColor}) => {
    return ( 
    <div class={`grid border p-4 rounded-lg gap-4 bg-[${bgColor}] order-1 md:order-0`}>
        <p class="overflow-hidden text-sm ">{title}</p>
        <p class="text-end text-3xl font-semibold truncate">{number}</p>
    </div>
     );
}
 
export default CounterCard;