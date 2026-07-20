/* Stylized two-layer Boston skyline for the hero, original SVG artwork. */
export default function Skyline() {
  return (
    <>
      <div className="skyline skyline-back">
        <svg viewBox="0 0 1440 200" preserveAspectRatio="xMidYMax slice" fill="#153a63" aria-hidden="true">
          <path d="M0 200V150h40v-22h26v22h30V96h14V82h22v14h14v54h44v-30h36v30h28V118h40v82zM290 200h50V72h10V56h18v16h10v128zM380 200h44v-58h30v58h40V110h48v90zM548 200h56V88l28-20 28 20v112zM668 200h40v-44h26v44h34V128h44v72zM818 200h58V64h12V48h20v16h12v136zM926 200h48v-70h36v70h30v-96h46v96zM1092 200h52V90h40v110h36v-60h30v60h44v-120h20v-18h16v18h18v120h92v-84h30v84h50V200z" />
        </svg>
      </div>
      <div className="skyline skyline-front">
        <svg viewBox="0 0 1440 150" preserveAspectRatio="xMidYMax slice" fill="#04101d" aria-hidden="true">
          <path d="M0 150v-56h34v-14h22v14h26v56zM96 150V70h12l6-22 6 22h12v80zM150 150V96h38v-22h8V58h10v16h8v22h30v54zM260 150V60l30-24 30 24v90zM334 150v-38h26v-16h30v16h24v38zM430 150V80h14V36h8V22h10v14h8v44h16v70zM500 150v-48h34v48zM548 150V64h48l10 16v70zM620 150v-30h96v30zM730 150V44l24-18 24 18v106zM792 150v-60h30V74h26v16h26v60zM888 150V92h20V54h8V30h10v24h8v38h18v58zM966 150v-42h34v42zM1014 150V70h36v80zM1064 150v-26h60v26zM1140 150V58h14V40l16-14 16 14v18h12v92zM1216 150v-48h28v-20h30v20h24v48zM1312 150V84h24V66h10V50h12v16h10v18h22v66h50v-40h20v40z" />
        </svg>
      </div>
    </>
  );
}
