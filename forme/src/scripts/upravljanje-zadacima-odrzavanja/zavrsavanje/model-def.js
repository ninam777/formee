import t from "tcomb-form";

/*var TipElementa = t.struct({
    naziv: t.String
});

var VrstaOdrzavanja = t.enums({
    "PogonskoIspitivanje": "Pogonsko ispitivanje",
    "Remont": "Remont",
    "Revizija": "Revizija"
})

var SablonOdrzavanja = t.struct({
    tipElementa: TipElementa,
    vrstaOdrzavanja: VrstaOdrzavanja
});

var ElementOdrzavanja = t.struct({
    naziv: t.String,
    tip: TipElementa
});*/

var Period = t.struct({
    od: t.Date,
    do: t.Date
});

var Zaposleni = t.struct({
    ime: t.String,
    prezime: t.String
});

/*ili ZavrsavanjeZadatkaOdrzavanja*/
var ZadatakOdrzavanja = t.struct({
    tipElementaOdrzavanja: t.String,
    elementOdrzavanja: t.String,
    vrstaOdrzavanja: t.String,
    dodeljeniPeriod: Period,
    brojRadnogNaloga: t.String,
    odgovornoLice: Zaposleni,
    izvrsioci: t.list(Zaposleni)
});

export default ZadatakOdrzavanja;
