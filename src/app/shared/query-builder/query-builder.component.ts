import {Component, EventEmitter} from '@angular/core';

import {MaterializeDirective} from "angular2-materialize";

import {Country} from "../country";
import {CountryService} from "../country.service";
import {Indicator} from "../indicator";
import {IndicatorService} from "../indicator.service";
import {WorldDataBankService} from "../worldDataBank.service";

@Component({
  selector: 'query-builder',
  templateUrl: 'app/shared/query-builder/query-builder.component.html',
  directives: [MaterializeDirective],
  providers: [CountryService, IndicatorService, WorldDataBankService],
  styleUrls:["static/css/spinner.css", "static/css/query-builder.css"],
  outputs:['serviceStartEvent', 'serviceEndEvent']
})

export class QueryBuilderComponent {
  private countries:Array<Country> = [];
  private tIndicators:Array<Indicator> = [];
  private startDate:number = new Date().getFullYear() - 15;
  private endDate:number = new Date().getFullYear();
  private indicator:string;
  private loading: boolean = false;
  // variables for input countries tags
  private inputCountries:string = "";
  private inputCountriesSuggestions:Array<Country> = [];
  private inputErrors = "";
  
  public serviceStartEvent: EventEmitter<boolean> = new EventEmitter();
  public serviceEndEvent: EventEmitter<boolean> = new EventEmitter();

  constructor(private countryService:CountryService,
              private indicatorService:IndicatorService,
              private worldDataBankService:WorldDataBankService) {
    // Get all the indicators, push them into this.tIndicators
    let rawIndicators = {
      "Access to electricity (% of population)":"EG.ELC.ACCS.ZS",
      "Adolescent fertility rate (births per 1,000 women ages 15-19)":"SP.ADO.TFRT",
      "Adult literacy rate, population 15+ years, both sexes (%)":"SE.ADT.LITR.ZS",
      "Agricultural irrigated land (% of total agricultural land)":"AG.LND.IRIG.AG.ZS",
      "Agricultural land (% of land area)":"AG.LND.AGRI.ZS",
      "Agricultural machinery, tractors per 100 sq. km of arable land":"AG.LND.TRAC.ZS",
      "Agricultural methane emissions (% of total)":"EN.ATM.METH.AG.ZS",
      "Agricultural nitrous oxide emissions (% of total)":"EN.ATM.NOXE.AG.ZS",
      "Agriculture value added per worker (constant 2005 US$)":"EA.PRD.AGRI.KD",
      "Air transport, registered carrier departures worldwide":"IS.AIR.DPRT",
      "Alternative and nuclear energy (% of total energy use)":"EG.USE.COMM.CL.ZS",
      "Annual freshwater withdrawals, agriculture (% of total freshwater withdrawal)":"ER.H2O.FWAG.ZS",
      "Annual freshwater withdrawals, domestic (% of total freshwater withdrawal)":"ER.H2O.FWDM.ZS",
      "Annual freshwater withdrawals, industry (% of total freshwater withdrawal)":"ER.H2O.FWIN.ZS",
      "Annual freshwater withdrawals, total (billion cubic meters)":"ER.H2O.FWTL.K3",
      "Annualized average growth rate in per capita real survey mean consumption or income, bottom 40% of population (%)":"SI.SPR.PC40.ZG",
      "Annualized average growth rate in per capita real survey mean consumption or income, total population (%)":"SI.SPR.PCAP.ZG",
      "Arable land (% of land area)":"AG.LND.ARBL.ZS",
      "Arable land (hectares per person)":"AG.LND.ARBL.HA.PC",
      "Bank capital to assets ratio (%)":"FB.BNK.CAPA.ZS",
      "Bank nonperforming loans to total gross loans (%)":"FB.AST.NPER.ZS",
      "Birth rate, crude (per 1,000 people)":"SP.DYN.CBRT.IN",
      "Births attended by skilled health staff (% of total)":"SH.STA.BRTC.ZS",
      "CO2 emissions (kt)":"EN.ATM.CO2E.KT",
      "CO2 emissions (metric tons per capita)":"EN.ATM.CO2E.PC",
      "CPIA economic management cluster average (1=low to 6=high)":"IQ.CPA.ECON.XQ",
      "CPIA policies for social inclusion/equity cluster average (1=low to 6=high)":"IQ.CPA.SOCI.XQ",
      "CPIA public sector management and institutions cluster average (1=low to 6=high)":"IQ.CPA.PUBS.XQ",
      "CPIA structural policies cluster average (1=low to 6=high)":"IQ.CPA.STRC.XQ",
      "Cash surplus/deficit (% of GDP)":"GC.BAL.CASH.GD.ZS",
      "Cause of death, by communicable diseases and maternal, prenatal and nutrition conditions (% of total)":"SH.DTH.COMM.ZS",
      "Cause of death, by injury (% of total)":"SH.DTH.INJR.ZS",
      "Cause of death, by non-communicable diseases (% of total)":"SH.DTH.NCOM.ZS",
      "Central government debt, total (% of GDP)":"GC.DOD.TOTL.GD.ZS",
      "Cereal yield (kg per hectare)":"AG.YLD.CREL.KG",
      "Charges for the use of intellectual property, payments (BoP, current US$)":"BM.GSR.ROYL.CD",
      "Charges for the use of intellectual property, receipts (BoP, current US$)":"BX.GSR.ROYL.CD",
      "Children in employment, female (% of female children ages 7-14)":"SL.TLF.0714.FE.ZS",
      "Children in employment, male (% of male children ages 7-14)":"SL.TLF.0714.MA.ZS",
      "Children in employment, study and work, female (% of female children in employment, ages 7-14)":"SL.TLF.0714.SW.FE.ZS",
      "Children in employment, study and work, male (% of male children in employment, ages 7-14)":"SL.TLF.0714.SW.MA.ZS",
      "Children in employment, total (% of children ages 7-14)":"SL.TLF.0714.ZS",
      "Children in employment, work only, female (% of female children in employment, ages 7-14)":"SL.TLF.0714.WK.FE.ZS",
      "Children in employment, work only, male (% of male children in employment, ages 7-14)":"SL.TLF.0714.WK.MA.ZS",
      "Claims on central government (annual growth as % of broad money)":"FM.AST.CGOV.ZG.M3",
      "Claims on other sectors of the domestic economy (annual growth as % of broad money)":"FM.AST.DOMO.ZG.M3",
      "Combustible renewables and waste (% of total energy)":"EG.USE.CRNW.ZS",
      "Completeness of death registration with cause-of-death information (%)":"SP.REG.DTHS.ZS",
      "Container port traffic (TEU: 20 foot equivalent units)":"IS.SHP.GOOD.TU",
      "Contraceptive prevalence, any methods (% of women ages 15-49)":"SP.DYN.CONU.ZS",
      "Crop production index (2004-2006 = 100)":"AG.PRD.CROP.XD",
      "Current account balance (BoP, current US$)":"BN.CAB.XOKA.CD",
      "Death rate, crude (per 1,000 people)":"SP.DYN.CDRT.IN",
      "Deposit interest rate (%)":"FR.INR.DPST",
      "Depth of credit information index (0=low to 8=high)":"IC.CRD.INFO.XQ",
      "Diabetes prevalence (% of population ages 20 to 79)":"SH.STA.DIAB.ZS",
      "Documents to export (number)":"IC.EXP.DOCS",
      "Documents to import (number)":"IC.IMP.DOCS",
      "Domestic credit provided by financial sector (% of GDP)":"FS.AST.DOMS.GD.ZS",
      "Domestic credit to private sector (% of GDP)":"FS.AST.PRVT.GD.ZS",
      "Ease of doing business index (1=most business-friendly regulations)":"IC.BUS.EASE.XQ",
      "Effective transition rate from primary to lower secondary general education, female (%)":"SE.SEC.PROG.FE.ZS",
      "Effective transition rate from primary to lower secondary general education, male (%)":"SE.SEC.PROG.MA.ZS",
      "Electric power consumption (kWh per capita)":"EG.USE.ELEC.KH.PC",
      "Employment in agriculture (% of total employment)":"SL.AGR.EMPL.ZS",
      "Employment in agriculture, female (% of female employment)":"SL.AGR.EMPL.FE.ZS",
      "Employment in agriculture, male (% of male employment)":"SL.AGR.EMPL.MA.ZS",
      "Employment in industry, female (% of female employment)":"SL.IND.EMPL.FE.ZS",
      "Employment in industry, male (% of male employment)":"SL.IND.EMPL.MA.ZS",
      "Employment in services, female (% of female employment)":"SL.SRV.EMPL.FE.ZS",
      "Employment in services, male (% of male employment)":"SL.SRV.EMPL.MA.ZS",
      "Employment to population ratio, 15+, total (%) (modeled ILO estimate)":"SL.EMP.TOTL.SP.ZS",
      "Energy imports, net (% of energy use)":"EG.IMP.CONS.ZS",
      "Energy intensity level of primary energy (MJ/$2011 PPP GDP)":"EG.EGY.PRIM.PP.KD",
      "Energy use (kg of oil equivalent per capita)":"EG.USE.PCAP.KG.OE",
      "Expenditure on education as % of total government expenditure (%)":"SE.XPD.TOTL.GB.ZS",
      "Expense (% of GDP)":"GC.XPN.TOTL.GD.ZS",
      "Export value index (2000 = 100)":"TX.VAL.MRCH.XD.WD",
      "Export volume index (2000 = 100)":"TX.QTY.MRCH.XD.WD",
      "Exports of goods and services (% of GDP)":"NE.EXP.GNFS.ZS",
      "External debt stocks, private nonguaranteed (PNG) (DOD, current US$)":"DT.DOD.DPNG.CD",
      "External debt stocks, public and publicly guaranteed (PPG) (DOD, current US$)":"DT.DOD.DPPG.CD",
      "External debt stocks, short-term (DOD, current US$)":"DT.DOD.DSTC.CD",
      "External debt stocks, total (DOD, current US$)":"DT.DOD.DECT.CD",
      "Fertility rate, total (births per woman)":"SP.DYN.TFRT.IN",
      "Fertilizer consumption (kilograms per hectare of arable land)":"AG.CON.FERT.ZS",
      "Firms using banks to finance investment (% of firms)":"IC.FRM.BNKS.ZS",
      "Firms with female top manager (% of firms)":"IC.FRM.FEMM.ZS",
      "Fish species, threatened":"EN.FSH.THRD.NO",
      "Fixed broadband subscriptions (per 100 people)":"IT.NET.BBND.P2",
      "Food production index (2004-2006 = 100)":"AG.PRD.FOOD.XD",
      "Foreign direct investment, net inflows (BoP, current US$)":"BX.KLT.DINV.CD.WD",
      "Forest area (% of land area)":"AG.LND.FRST.ZS",
      "Forest area (sq. km)":"AG.LND.FRST.K2",
      "Fossil fuel energy consumption (% of total)":"EG.USE.COMM.FO.ZS",
      "GDP at market prices (current US$)":"NY.GDP.MKTP.CD",
      "GDP growth (annual %)":"NY.GDP.MKTP.KD.ZG",
      "GDP per capita (current US$)":"NY.GDP.PCAP.CD",
      "GDP per person employed (constant 2011 PPP $)":"SL.GDP.PCAP.EM.KD",
      "GDP per unit of energy use (constant 2011 PPP $ per kg of oil equivalent)":"EG.GDP.PUSE.KO.PP.KD",
      "GEF benefits index for biodiversity (0 = no biodiversity potential to 100 = maximum)":"ER.BDV.TOTL.XQ",
      "GNI per capita, Atlas method (current US$)":"NY.GNP.PCAP.CD",
      "GNI per capita, PPP (current international $)":"NY.GNP.PCAP.PP.CD",
      "GNI, Atlas method (current US$)":"NY.GNP.ATLS.CD",
      "GNI, PPP (current international $)":"NY.GNP.MKTP.PP.CD",
      "Government expenditure on education as % of GDP (%)":"SE.XPD.TOTL.GD.ZS",
      "Government expenditure per primary student as % of GDP per capita (%)":"SE.XPD.PRIM.PC.ZS",
      "Government expenditure per secondary student as % of GDP per capita (%)":"SE.XPD.SECO.PC.ZS",
      "Government expenditure per tertiary student as % of GDP per capita (%)":"SE.XPD.TERT.PC.ZS",
      "Gross capital formation (% of GDP)":"NE.GDI.TOTL.ZS",
      "Gross enrollment ratio, primary, both sexes (%)":"SE.PRM.ENRR",
      "Gross enrolment ratio, pre-primary, both sexes (%)":"SE.PRE.ENRR",
      "Gross enrolment ratio, primary and secondary, gender parity index (GPI)":"SE.ENR.PRSC.FM.ZS",
      "Gross enrolment ratio, primary, gender parity index (GPI)":"SE.ENR.PRIM.FM.ZS",
      "Gross enrolment ratio, secondary, both sexes (%)":"SE.SEC.ENRR",
      "Gross enrolment ratio, secondary, gender parity index (GPI)":"SE.ENR.SECO.FM.ZS",
      "Gross enrolment ratio, tertiary, both sexes (%)":"SE.TER.ENRR",
      "Gross enrolment ratio, tertiary, gender parity index (GPI)":"SE.ENR.TERT.FM.ZS",
      "Gross intake ratio to Grade 1 of primary education, female (%)":"SE.PRM.GINT.FE.ZS",
      "Gross intake ratio to Grade 1 of primary education, male (%)":"SE.PRM.GINT.MA.ZS",
      "Gross savings (% of GDP)":"NY.GNS.ICTR.ZS",
      "Health expenditure per capita (current US$)":"SH.XPD.PCAP",
      "Health expenditure, public (% of total health expenditure)":"SH.XPD.PUBL",
      "Health expenditure, total (% of GDP)":"SH.XPD.TOTL.ZS",
      "High-technology exports (% of manufactured exports)":"TX.VAL.TECH.MF.ZS",
      "High-technology exports (current US$)":"TX.VAL.TECH.CD",
      "IBRD loans and IDA credits (DOD, current US$)":"DT.DOD.MWBG.CD",
      "ICT goods exports (% of total goods exports)":"TX.VAL.ICTG.ZS.UN",
      "ICT goods imports (% total goods imports)":"TM.VAL.ICTG.ZS.UN",
      "ICT service exports (% of service exports, BoP)":"BX.GSR.CCIS.ZS",
      "IDA resource allocation index (1=low to 6=high)":"IQ.CPA.IRAI.XQ",
      "Immunization, DPT (% of children ages 12-23 months)":"SH.IMM.IDPT",
      "Immunization, measles (% of children ages 12-23 months)":"SH.IMM.MEAS",
      "Import value index (2000 = 100)":"TM.VAL.MRCH.XD.WD",
      "Import volume index (2000 = 100)":"TM.QTY.MRCH.XD.WD",
      "Imports of goods and services (% of GDP)":"NE.IMP.GNFS.ZS",
      "Improved sanitation facilities (% of population with access)":"SH.STA.ACSN",
      "Improved sanitation facilities, urban (% of urban population with access)":"SH.STA.ACSN.UR",
      "Improved water source, rural (% of rural population with access)":"SH.H2O.SAFE.RU.ZS",
      "Improved water source, urban (% of urban population with access)":"SH.H2O.SAFE.UR.ZS",
      "Incidence of tuberculosis (per 100,000 people)":"SH.TBS.INCD",
      "Income share held by fourth 20%":"SI.DST.04TH.20",
      "Income share held by highest 10%":"SI.DST.10TH.10",
      "Income share held by highest 20%":"SI.DST.05TH.20",
      "Income share held by lowest 10%":"SI.DST.FRST.10",
      "Income share held by lowest 20%":"SI.DST.FRST.20",
      "Income share held by second 20%":"SI.DST.02ND.20",
      "Income share held by third 20%":"SI.DST.03RD.20",
      "Industry, value added (% of GDP)":"NV.IND.TOTL.ZS",
      "Inflation, GDP deflator (annual %)":"NY.GDP.DEFL.KD.ZG",
      "Inflation, consumer prices (annual %)":"FP.CPI.TOTL.ZG",
      "Informal payments to public officials (% of firms)":"IC.FRM.CORR.ZS",
      "Interest rate spread (lending rate minus deposit rate, %)":"FR.INR.LNDP",
      "International migrant stock, total":"SM.POP.TOTL",
      "Internationally-recognized quality certification (% of firms)":"IC.FRM.ISOC.ZS",
      "Internet users (per 100 people)":"IT.NET.USER.P2",
      "Investment in energy with private participation (current US$)":"IE.PPI.ENGY.CD",
      "Investment in telecoms with private participation (current US$)":"IE.PPI.TELE.CD",
      "Investment in transport with private participation (current US$)":"IE.PPI.TRAN.CD",
      "Investment in water and sanitation with private participation (current US$)":"IE.PPI.WATR.CD",
      "Labor force participation rate for ages 15-24, female (%) (modeled ILO estimate)":"SL.TLF.ACTI.1524.FE.ZS",
      "Labor force participation rate for ages 15-24, male (%) (modeled ILO estimate)":"SL.TLF.ACTI.1524.MA.ZS",
      "Labor force participation rate for ages 15-24, total (%) (modeled ILO estimate)":"SL.TLF.ACTI.1524.ZS",
      "Labor force participation rate, female (% of female population ages 15+) (modeled ILO estimate)":"SL.TLF.CACT.FE.ZS",
      "Labor force participation rate, female (% of female population ages 15-64) (modeled ILO estimate)":"SL.TLF.ACTI.FE.ZS",
      "Labor force participation rate, male (% of male population ages 15+) (modeled ILO estimate)":"SL.TLF.CACT.MA.ZS",
      "Labor force participation rate, male (% of male population ages 15-64) (modeled ILO estimate)":"SL.TLF.ACTI.MA.ZS",
      "Labor force participation rate, total (% of total population ages 15+) (modeled ILO estimate)":"SL.TLF.CACT.ZS",
      "Labor force participation rate, total (% of total population ages 15-64) (modeled ILO estimate)":"SL.TLF.ACTI.ZS",
      "Labor force, total":"SL.TLF.TOTL.IN",
      "Land area (sq. km)":"AG.LND.TOTL.K2",
      "Land area where elevation is below 5 meters (% of total land area)":"AG.LND.EL5M.ZS",
      "Land under cereal production (hectares)":"AG.LND.CREL.HA",
      "Lead time to export, median case (days)":"LP.EXP.DURS.MD",
      "Lead time to import, median case (days)":"LP.IMP.DURS.MD",
      "Lending interest rate (%)":"FR.INR.LEND",
      "Life expectancy at birth, female (years)":"SP.DYN.LE00.FE.IN",
      "Life expectancy at birth, male (years)":"SP.DYN.LE00.MA.IN",
      "Life expectancy at birth, total (years)":"SP.DYN.LE00.IN",
      "Listed domestic companies, total":"CM.MKT.LDOM.NO",
      "Livestock production index (2004-2006 = 100)":"AG.PRD.LVSK.XD",
      "Logistics performance index: Overall (1=low to 5=high)":"LP.LPI.OVRL.XQ",
      "Long-term unemployment (% of total unemployment)":"SL.UEM.LTRM.ZS",
      "Long-term unemployment, female (% of female unemployment)":"SL.UEM.LTRM.FE.ZS",
      "Long-term unemployment, male (% of male unemployment)":"SL.UEM.LTRM.MA.ZS",
      "Mammal species, threatened":"EN.MAM.THRD.NO",
      "Marine protected areas (% of territorial waters)":"ER.MRN.PTMR.ZS",
      "Market capitalization of listed domestic companies (% of GDP)":"CM.MKT.LCAP.GD.ZS",
      "Market capitalization of listed domestic companies (current US$)":"CM.MKT.LCAP.CD",
      "Maternal mortality ratio (modeled estimate, per 100,000 live births)":"SH.STA.MMRT",
      "Merchandise trade (% of GDP)":"TG.VAL.TOTL.GD.ZS",
      "Methane emissions (kt of CO2 equivalent)":"EN.ATM.METH.KT.CE",
      "Military expenditure (% of GDP)":"MS.MIL.XPND.GD.ZS",
      "Military expenditure (% of central government expenditure)":"MS.MIL.XPND.ZS",
      "Mobile cellular subscriptions (per 100 people)":"IT.CEL.SETS.P2",
      "Money and quasi money growth (annual %)":"FM.LBL.MQMY.ZG",
      "Mortality rate, infant (per 1,000 live births)":"SP.DYN.IMRT.IN",
      "Mortality rate, under-5 (per 1,000)":"SH.DYN.MORT",
      "Net ODA received (% of GNI)":"DT.ODA.ODAT.GN.ZS",
      "Net ODA received per capita (current US$)":"DT.ODA.ODAT.PC.ZS",
      "Net barter terms of trade index (2000 = 100)":"TT.PRI.MRCH.XD.WD",
      "Net bilateral aid flows from DAC donors, Korea, Rep. (current US$)":"DC.DAC.KORL.CD",
      "Net enrolment rate, primary, both sexes (%)":"SE.PRM.NENR",
      "Net enrolment rate, secondary, both sexes (%)":"SE.SEC.NENR",
      "Net flows on external debt, long-term (NFL, current US$)":"DT.NFL.DLXF.CD",
      "Net flows on external debt, total (NFL, current US$)":"DT.NFL.DECT.CD",
      "Net migration":"SM.POP.NETM",
      "Net official development assistance and official aid received (current US$)":"DT.ODA.ALLD.CD",
      "Net official development assistance received (current US$)":"DT.ODA.ODAT.CD",
      "New businesses registered (number)":"IC.BUS.NREG",
      "Nitrous oxide emissions (thousand metric tons of CO2 equivalent)":"EN.ATM.NOXE.KT.CE",
      "Number of surgical procedures (per 100,000 population)":"SH.SGR.PROC.P5",
      "Number of visits or required meetings with tax officials":"IC.TAX.METG",
      "Other greenhouse gas emissions, HFC, PFC and SF6 (thousand metric tons of CO2 equivalent)":"EN.ATM.GHGO.KT.CE",
      "Out-of-pocket health expenditure (% of private expenditure on health)":"SH.XPD.OOPC.ZS",
      "Out-of-school children of primary school age, female (number)":"SE.PRM.UNER.FE",
      "Out-of-school children of primary school age, male (number)":"SE.PRM.UNER.MA",
      "PM2.5 air pollution, mean annual exposure (micrograms per cubic meter)":"EN.ATM.PM25.MC.M3",
      "PM2.5 air pollution, population exposed to levels exceeding WHO guideline value (% of total)":"EN.ATM.PM25.MC.ZS",
      "Patent applications, nonresidents":"IP.PAT.NRES",
      "Patent applications, residents":"IP.PAT.RESD",
      "Percentage of repeaters in primary education, all grades, female (%)":"SE.PRM.REPT.FE.ZS",
      "Percentage of repeaters in primary education, all grades, male (%)":"SE.PRM.REPT.MA.ZS",
      "Percentage of teachers in primary education who are trained, both sexes (%)":"SE.PRM.TCAQ.ZS",
      "Permanent cropland (% of land area)":"AG.LND.CROP.ZS",
      "Personal remittances, received (current US$)":"BX.TRF.PWKR.CD.DT",
      "Plant species (higher), threatened":"EN.HPT.THRD.NO",
      "Population ages 65 and above (% of total)":"SP.POP.65UP.TO.ZS",
      "Population growth (annual %)":"SP.POP.GROW",
      "Population in the largest city (% of urban population)":"EN.URB.LCTY.UR.ZS",
      "Population in urban agglomerations of more than 1 million (% of total population)":"EN.URB.MCTY.TL.ZS",
      "Population living in areas where elevation is below 5 meters (% of total population)":"EN.POP.EL5M.ZS",
      "Population, ages 0-14 (% of total)":"SP.POP.0014.TO.ZS",
      "Population, ages 15-64 (% of total)":"SP.POP.1564.TO.ZS",
      "Population, female (% of total)":"SP.POP.TOTL.FE.ZS",
      "Population, total":"SP.POP.TOTL",
      "Portfolio equity, net inflows (BoP, current US$)":"BX.PEF.TOTL.CD.WD",
      "Poverty gap at $1.90 a day (2011 PPP) (%)":"SI.POV.GAPS",
      "Poverty gap at $3.10 a day (2011 PPP) (%)":"SI.POV.GAP2",
      "Poverty gap at national poverty lines (%)":"SI.POV.NAGP",
      "Poverty headcount ratio at $1.90 a day (2011 PPP) (% of population)":"SI.POV.DDAY",
      "Poverty headcount ratio at $3.10 a day (2011 PPP) (% of population)":"SI.POV.2DAY",
      "Poverty headcount ratio at national poverty lines (% of population)":"SI.POV.NAHC",
      "Pregnant women receiving prenatal care (%)":"SH.STA.ANVC.ZS",
      "Prevalence of HIV, female (% ages 15-24)":"SH.HIV.1524.FE.ZS",
      "Prevalence of HIV, male (% ages 15-24)":"SH.HIV.1524.MA.ZS",
      "Prevalence of HIV, total (% of population ages 15-49)":"SH.DYN.AIDS.ZS",
      "Prevalence of anemia among children (% of children under 5)":"SH.ANM.CHLD.ZS",
      "Prevalence of stunting, height for age (% of children under 5)":"SH.STA.STNT.ZS",
      "Prevalence of underweight, weight for age (% of children under 5)":"SH.STA.MALN.ZS",
      "Primary completion rate, both sexes (%)":"SE.PRM.CMPT.ZS",
      "Primary completion rate, female (%)":"SE.PRM.CMPT.FE.ZS",
      "Primary completion rate, male (%)":"SE.PRM.CMPT.MA.ZS",
      "Private credit bureau coverage (% of adults)":"IC.CRD.PRVT.ZS",
      "Proportion of seats held by women in national parliaments (%)":"SG.GEN.PARL.ZS",
      "Public credit registry coverage (% of adults)":"IC.CRD.PUBL.ZS",
      "Pump price for diesel fuel (US$ per liter)":"EP.PMP.DESL.CD",
      "Pump price for gasoline (US$ per liter)":"EP.PMP.SGAS.CD",
      "Pupil-teacher ratio in primary education (headcount basis)":"SE.PRM.ENRL.TC.ZS",
      "Rail lines (total route-km)":"IS.RRS.TOTL.KM",
      "Real interest rate (%)":"FR.INR.RINR",
      "Refugee population by country or territory of asylum":"SM.POP.REFG",
      "Refugee population by country or territory of origin":"SM.POP.REFG.OR",
      "Renewable electricity output (% of total electricity output)":"EG.ELC.RNEW.ZS",
      "Renewable energy consumption (% of total final energy consumption)":"EG.FEC.RNEW.ZS",
      "Renewable internal freshwater resources per capita (cubic meters)":"ER.H2O.INTR.PC",
      "Renewable internal freshwater resources, total (billion cubic meters)":"ER.H2O.INTR.K3",
      "Research and development expenditure (% of GDP)":"GB.XPD.RSDV.GD.ZS",
      "Researchers in R&amp;D (per million people)":"SP.POP.SCIE.RD.P6",
      "Revenue, excluding grants (% of GDP)":"GC.REV.XGRT.GD.ZS",
      "Risk of catastrophic expenditure for surgical care (% of people at risk)":"SH.SGR.CRSK.ZS",
      "Risk of impoverishing expenditure for surgical care (% of people at risk)":"SH.SGR.IRSK.ZS",
      "Risk premium on lending (lending rate minus treasury bill rate, %)":"FR.INR.RISK",
      "Rural population":"SP.RUR.TOTL",
      "Rural population (% of total population)":"SP.RUR.TOTL.ZS",
      "Rural poverty gap at national poverty lines (%)":"SI.POV.RUGP",
      "Rural poverty headcount ratio at national poverty lines (% of rural population)":"SI.POV.RUHC",
      "S&amp;P Global Equity Indices (annual % change)":"CM.MKT.INDX.ZG",
      "Scientific and technical journal articles":"IP.JRN.ARTC.SC",
      "Secondary income, other sectors, payments (BoP, current US$)":"BM.TRF.PRVT.CD",
      "Secure Internet servers (per 1 million people)":"IT.NET.SECR.P6",
      "Services, etc., value added (% of GDP)":"NV.SRV.TETC.ZS",
      "Share of women in wage employment in the nonagricultural sector (% of total nonagricultural employment)":"SL.EMP.INSV.FE.ZS",
      "Specialist surgical workforce (per 100,000 population)":"SH.MED.SAOP.P5",
      "Start-up procedures to register a business (number)":"IC.REG.PROC",
      "Stocks traded, total value (% of GDP)":"CM.MKT.TRAD.GD.ZS",
      "Stocks traded, turnover ratio of domestic shares (%)":"CM.MKT.TRNR",
      "Strength of legal rights index (0=weak to 12=strong)":"IC.LGL.CRED.XQ",
      "Survey mean consumption or income per capita, bottom 40% of population (2011 PPP $ per day)":"SI.SPR.PC40",
      "Survey mean consumption or income per capita, total population (2011 PPP $ per day)":"SI.SPR.PCAP",
      "Survival rate to the last grade of primary education, female (%)":"SE.PRM.PRSL.FE.ZS",
      "Survival rate to the last grade of primary education, male (%)":"SE.PRM.PRSL.MA.ZS",
      "Tax payments (number)":"IC.TAX.PAYM",
      "Tax revenue (% of GDP)":"GC.TAX.TOTL.GD.ZS",
      "Technicians in R&amp;D (per million people)":"SP.POP.TECH.RD.P6",
      "Teenage mothers (% of women ages 15-19 who have had children or are currently pregnant)":"SP.MTR.1519.ZS",
      "Time required to start a business (days)":"IC.REG.DURS",
      "Time to prepare and pay taxes (hours)":"IC.TAX.DURS",
      "Time to resolve insolvency (years)":"IC.ISV.DURS",
      "Total debt service (% of exports of goods, services and primary income)":"DT.TDS.DECT.EX.ZS",
      "Total reserves (includes gold, current US$)":"FI.RES.TOTL.CD",
      "Total tax rate (% of commercial profits)":"IC.TAX.TOTL.CP.ZS",
      "Trade in services (% of GDP)":"BG.GSR.NFSV.GD.ZS",
      "Trademark applications, direct nonresident":"IP.TMK.NRES",
      "Trademark applications, direct resident":"IP.TMK.RESD",
      "Unemployment, female (% of female labor force)":"SL.UEM.TOTL.FE.ZS",
      "Unemployment, male (% of male labor force)":"SL.UEM.TOTL.MA.ZS",
      "Unemployment, total (% of total labor force)":"SL.UEM.TOTL.ZS",
      "Unemployment, youth female (% of female labor force ages 15-24) (modeled ILO estimate)":"SL.UEM.1524.FE.ZS",
      "Unemployment, youth male (% of male labor force ages 15-24) (modeled ILO estimate)":"SL.UEM.1524.MA.ZS",
      "Unmet need for contraception (% of married women ages 15-49)":"SP.UWT.TFRT",
      "Urban population":"SP.URB.TOTL",
      "Urban population (% of total)":"SP.URB.TOTL.IN.ZS",
      "Urban poverty gap at national poverty lines (%)":"SI.POV.URGP",
      "Urban poverty headcount ratio at national poverty lines (% of urban population)":"SI.POV.URHC",
      "Use of IMF credit (DOD, current US$)":"DT.DOD.DIMF.CD",
      "Value lost due to electrical outages (% of sales)":"IC.FRM.OUTG.ZS",
      "Vulnerable employment, female (% of female employment)":"SL.EMP.VULN.FE.ZS",
      "Vulnerable employment, male (% of male employment)":"SL.EMP.VULN.MA.ZS",
      "Vulnerable employment, total (% of total employment)":"SL.EMP.VULN.ZS",
      "Youth literacy rate, population 15-24 years, both sexes (%)":"SE.ADT.1524.LT.ZS",
      "Youth literacy rate, population 15-24 years, female (%)":"SE.ADT.1524.LT.FE.ZS",
      "Youth literacy rate, population 15-24 years, male (%)":"SE.ADT.1524.LT.MA.ZS"
    };

    let rawIndicatorKeys = Object.keys(rawIndicators);
    rawIndicatorKeys.sort();
    for (let rawIndicatorKey of rawIndicatorKeys) {
      let tempIndicator = new Indicator();
      tempIndicator.name = rawIndicatorKey;
      tempIndicator.id = rawIndicators[rawIndicatorKey];
      this.tIndicators.push(tempIndicator);
    }

    console.log('getting countries');
    this.countryService.getCountries()
      .subscribe(
        countries => {
          console.log('got countries');
          for (var tCountry of countries) {
            this.countries.push(tCountry);
          }
        },
        error => {
          console.log('error:');
          console.log(error);
        }
      );
    /*
    // hard coding the indicators instead due to production bug
    console.log('getting indicators');
    this.indicatorService.getIndicators()
      .subscribe(
        indicators => {
          console.log('got indicators');
          for (var tIndicator of indicators) {
            this.tIndicators.push(tIndicator);
          }
        },
        error => {
          console.log('error:');
          console.log(error);
        }
      )
      */
  }

  generateRequest = function () {
    // If we're loading, don't generate a new request
    if (this.loading) {
      return;
    }
    
    // Months are zero indexed in javascript, but the API request requirs "1" indexed, so add 1.
    var startYear:number = this.startDate;
    var endYear:number = this.endDate;
    var indicatorCode:string = this.indicator;
    var countryList = "";
    var resultQuery = "http://api.worldbank.org/countries/";

    // get all of the countries from that gross :poop: auto complete implementation
    var selectedCountries:Array<Country> = [];
    var rawCountryNames:Array<string> = this.inputCountries.split("|");
    for (var rawCountryName of rawCountryNames) {
      for (var actualCountry of this.countries) {
        if (rawCountryName.trim() === actualCountry.name){
          selectedCountries.push(actualCountry);
          break;
        }
      }
    }

    if (selectedCountries.length === 0) {
      this.inputErrors = "Please enter valid countries.";
      return;
    }
    
    if (!indicatorCode) {
      this.inputErrors = "Please select an indicator code.";
      return;
    }
    
    if (!startYear) {
      this.inputErrors = "Please select a valid start year (must be greater than or equal to 1960, and less than the end year).";
      return;
    }
    
    if (!endYear) {
      this.inputErrors = "Please select a valid end year (must be less than or equal to the current year, and greater than the start year)";
      return;
    }
    if(startYear>endYear){
      this.inputErrors = "Start year must be less than end year";
      return;
    }
    
    this.inputErrors = "";
    
    this.loading = true;
    this.serviceStartEvent.emit(true);
    
    for (var country in selectedCountries) {
      if (!(selectedCountries.hasOwnProperty(country))) continue;
      countryList += selectedCountries[country].id + ";";
    }
    //Remove trailing semi-colon, may not be necesssary
    countryList = countryList.slice(0, -1);

    // This query includes the months, but those seem to break the year range
    // so I'm just going with the year range for now
    resultQuery += countryList + "/indicators/" + indicatorCode + "?per_page=10000&date=" + 
      startYear + ":" + endYear + "&format=json";
    this.worldDataBankService.execute(resultQuery).subscribe(
      worldDataBankResponse => {
        this.loading = false;
        
        // This event tells the wbd component that the json response has be recieved.
        this.serviceEndEvent.emit(true);
      },
      error => {
        this.loading = false;
        console.log('error:');
        console.log(error);
      }
    );

  };


  /**
   * Super gross hacked together auto complete, because I don't like the multiple select css
   * @param $event
   */
  countriesInputChanged($event) {
    if ($event.keyIdentifier === "Enter" && this.inputCountriesSuggestions.length > 0) {
      var suggestion:Country = this.inputCountriesSuggestions[0];
      var sepIndex:number = this.inputCountries.lastIndexOf("|");
      if (sepIndex < 0) {
        this.inputCountries = suggestion.name + " | ";
      } else {
        this.inputCountries = this.inputCountries.substring(0, sepIndex + 1) + " " + suggestion.name + " | ";
      }
    }
    this.repopulateSuggestions();
  }

  /**
   * Gross hacked together auto complete if a user clicks something instead of hitting enter
   * @param country
   */
  countriesInputClicked(country:Country) {
    var sepIndex:number = this.inputCountries.lastIndexOf("|");
    if (sepIndex < 0) {
      this.inputCountries = country.name + " | ";
    } else {
      this.inputCountries = this.inputCountries.substring(0, sepIndex + 1) + " " + country.name + " | ";
    }
    this.repopulateSuggestions();
  }

  /**
   * Repopulate the search suggestions based on the search state
   */
  repopulateSuggestions() {
    this.inputCountriesSuggestions = [];
    if (this.inputCountries !== "") {
      let sepIndex:number = this.inputCountries.lastIndexOf("|");
      if (sepIndex === -1) {
        sepIndex = 0;
      } else {
        sepIndex += 1;
      }
      let searchString = this.inputCountries.substring(sepIndex, this.inputCountries.length);
      searchString = searchString.trim();
      if (searchString.trim() === "") {
        this.inputCountriesSuggestions = [];
      } else {
        for (var hintCountry of this.countries) {
          let index = hintCountry.name.toLowerCase().search(searchString.toLowerCase());
          if (index !== -1) this.inputCountriesSuggestions.push(hintCountry);
        }
      }
    }
  }
}
