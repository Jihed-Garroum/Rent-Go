import { StyleSheet, Text, View, ScrollView, Pressable, Dimensions, Platform } from 'react-native';
import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const { height, width } = Dimensions.get("screen");

const TermsAndConditions = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [isButtonEnabled, setButtonEnabled] = useState(false);

  const total = route.params.total;

  const handleScroll = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const paddingToBottom = 20;
    if (layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom) {
      setButtonEnabled(true);
    } else {
      setButtonEnabled(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Pressable style={styles.arrowContainer} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-circle" size={45} color="black" />
        </Pressable>
      </View>
      <ScrollView contentContainerStyle={styles.container} onScroll={handleScroll}>
        <Text style={styles.title}>Terms and Conditions</Text>

        <Text style={styles.sectionHeading}>Definitions</Text>
        <Text style={styles.paragraph}>
          <Text style={styles.bold}>Agreement:</Text> Refers to the terms and conditions outlined in these terms and conditions and the provisions found on the face page provided to you on the day of your rental. {'\n\n'}
          <Text style={styles.bold}>You or your:</Text> The person identified as the renter in this agreement, any person signing this agreement, any authorized driver, or any person or organization to whom charges are billed by us at its or the renter's direction. All persons referred to as you or your are jointly and severally bound by this agreement. {'\n\n'}
          <Text style={styles.bold}>We, our, aquacars, or us:</Text> Drive Aquar Experience, S.A.R.L. {'\n\n'}
          <Text style={styles.bold}>Additional driver:</Text> A person listed on the face page of this agreement. {'\n\n'}
          <Text style={styles.bold}>Authorized driver:</Text> The renter, any additional driver, or any other individual, but only where required by applicable state law. {'\n\n'}
          <Text style={styles.bold}>Unauthorized driver:</Text> Anyone who is not the renter, any additional driver, nor any other individual as required by applicable law. {'\n\n'}
          <Text style={styles.bold}>Driver requirements:</Text> Each authorized driver must have a valid driver's license for the duration of the rental period or the reservation period, whichever is longer, and at most locations be at least 21 years old. Exceptions for drivers under 21 must be clearly approved by the particular partner. {'\n\n'}
          <Text style={styles.bold}>Vehicle:</Text> The motor vehicle identified in this agreement and any vehicle we substitute for it, including all its tires, tools, accessories, equipment, keys, and vehicle documents. The vehicle does not include portable navigation devices or other optional equipment, which are referred to as optional equipment that you rent from us. {'\n\n'}
          <Text style={styles.bold}>Damage:</Text> Any material damage caused by the driver or any other authorized person. {'\n\n'}
          <Text style={styles.bold}>Diminished value:</Text> The difference between the value of the vehicle immediately prior to damage or loss and the value of the vehicle after repair or replacement. {'\n\n'}
          <Text style={styles.bold}>Vehicle license fee:</Text> Our estimate of the average per day vehicle portion of charges imposed by governmental authorities on us, including our total annual vehicle license, titling, plating, inspection, and regulation costs, or to recover other similar charges as permitted by applicable law.
        </Text>

        <Text style={styles.sectionHeading}>Rental, Indemnity, and No Warranties</Text>
        <Text style={styles.paragraph}>
          This contract governs the rental of the Vehicle. The price listed on your Face Page applies exclusively to the specified rental period indicated there. If you return the Vehicle either earlier or later than the agreed period, the price is subject to change. To the extent permitted by law, we reserve the right to terminate this Agreement and repossess the Vehicle at your expense without prior notice if you breach this Agreement or if the Vehicle is abandoned or used in violation of the law or the terms of this Agreement. {'\n\n'}
          To the extent permitted by law, you agree to indemnify, defend, and hold us harmless from all claims, liabilities, costs, and attorney fees we incur as a result of or arising from this rental and your use of the Vehicle. We make no warranties, whether express, implied, or apparent, regarding the Vehicle, including no warranty of merchantability or fitness for a particular purpose. You agree not to alter the Vehicle or any Optional Equipment. If you or an Authorized Driver determine that the Vehicle or any Optional Equipment is unsafe, you or the Authorized Driver must stop operating the Vehicle or Optional Equipment and notify us immediately.
        </Text>

        <Text style={styles.sectionHeading}>Telematics Notice and Release</Text>
        <Text style={styles.paragraph}>
          You acknowledge that the Vehicle may be equipped with a telematics device, global positioning satellite (GPS) technology, an electronic locator device, and/or an event data recorder. We may locate, monitor, or disable the Vehicle through such systems if we deem it necessary, without warning or notice, to the extent permitted by applicable law. Remote monitoring may include the collection of Vehicle data such as location, odometer readings, oil life, fuel level, tire pressure, battery charge, diagnostic trouble codes, and other elements we may deem necessary. We are not responsible for the operability of any telematics, navigational, or other system included with the Vehicle. You acknowledge that these systems may use cellular telephone, wireless technology, Bluetooth technology, or radio signals to transmit data, and therefore, your privacy cannot be guaranteed. You authorize any person's use or disclosure of or access to location information, automatic crash notification, and operational vehicle reporting conditions of the Vehicle as permitted by law. You shall inform any and all drivers and passengers of the Vehicle of the terms of this section and that you have authorized the release of information as provided herein. {'\n\n'}
          You agree to release us and to indemnify, defend, and hold us harmless for any damage to persons or property caused by the failure of the telematics device to operate properly, or otherwise arising from the use of the telematics device. Third-party telematics service providers are not our agents, employees, or contractors. Your use of a telematics system during the rental is subject to the terms of service and privacy policy of the third-party telematics system provider. The Vehicle may collect and store personal information if you choose to connect your smartphone or other device to the Vehicle’s Infotainment System. Aqwa does not access, collect, or use any information that may be stored by the Infotainment System. If you choose to connect your device to the Infotainment System, you represent that you understand that information from your device may be stored by the Vehicle’s Infotainment System.
        </Text>

        <Text style={styles.sectionHeading}>Condition and Return of Vehicle</Text>
        <Text style={styles.paragraph}>
          Vehicle Return {'\n'}
          You must return the Vehicle to our rental office or another location we identify, on the date and time specified in this Agreement, and in the same condition you received it, except for ordinary wear. If the Vehicle is returned to a different office or location or left somewhere else, you remain responsible for the safety of and any damage to or loss of the Vehicle until we inspect it. Additionally, you authorize us to charge your credit or debit card a one-way fee plus any additional costs we incur to return the Vehicle. If the Vehicle is returned after business hours, you remain responsible for its safety and any damage or loss until we inspect it during our next business hours. Any service to the Vehicle or replacement of parts or accessories during the rental period requires our prior written approval. You must check and maintain all fluid levels, ensure the Vehicle is in a roadworthy condition, lock the Vehicle at all times when not in use, and return the Vehicle with at least the same amount of fuel as when it was rented, unless you purchase a prepaid fuel service. No refund or credit will be issued if you return the Vehicle with more fuel than when you received it.
        </Text>

        <Text style={styles.sectionHeading}>Responsibility for Damage or Loss; Reporting to Police; Responsibility for Fees; Responsibility for Optional Equipment</Text>
        <Text style={styles.paragraph}>
          You are responsible for all damage to and loss or theft of the Vehicle, including damage caused by collision, weather, road conditions, and acts of nature, even if you are not at fault. This includes damage caused by the optional use or misuse of autonomous features on the Vehicle. You agree to follow all manufacturer’s instructions when using autonomous features and acknowledge that you use them at your own risk. It is your responsibility to inspect the Vehicle for damage before leaving our facility. You are responsible for the cost of repair or the actual cash retail value of the Vehicle on the date of the loss if the Vehicle is not repairable or if we elect not to repair it. You are also responsible for Loss of Use (without regard to fleet utilization), Diminished Value, and our administrative expenses incurred in processing a claim. You must report all accidents and incidents of theft and vandalism to us and the police as soon as you discover them. You are responsible for paying all parking citations, toll fees (subject to Section 5a below), fines for toll evasion, and other fees, fines, and penalties assessed against you, us, or the Vehicle during the rental period. If you fail to pay any of these charges and we pay any part of them, you will reimburse us for all such charges and pay us an administrative fee of up to 100.000 TND for each charge. However, we may, at our sole discretion, pay any fines or fees discussed in this section on your behalf without your prior approval and seek reimbursement from you according to this section. You authorize us to charge your credit or debit card for these amounts.
        </Text>

        <Text style={styles.sectionHeading}>Optional Equipment</Text>
        <Text style={styles.paragraph}>
          Upon request and subject to availability, we offer certain Optional Equipment, including but not limited to Child Seats and Global Positioning Devices (GPS), for your use during the rental at an additional charge. All Optional Equipment is rented AS IS and must be returned in the same condition as when rented. Optional Equipment is not part of the Vehicle. You are responsible for any loss or damage to any Optional Equipment, regardless of the cause, even if you have accepted LDW or PDW. You should review the operational instructions for all Optional Equipment before leaving the rental location. If you rent a Child Seat from us, you are solely responsible for inspecting and properly installing the seat yourself. We make no warranties, express, implied, or apparent, regarding the Child Seat or any other Optional Equipment, including no warranty of merchantability or fitness for a particular purpose. You are responsible for all injury or damage arising out of or related to your use of the Child Seat or any other Optional Equipment. If you rent a GPS from us, you are responsible for returning it in the same condition as when rented, with all accessories provided, including the carrying case, car charger, windshield mount, and, where provided, the console beanbag mount ("GPS Accessories"). If the GPS or GPS Accessories are lost or damaged and require repair or replacement, you will pay us the fair market value for their repair or replacement.
        </Text>

        <Text style={styles.sectionHeading}>Loss Damage Waiver; Prohibited Use of the Vehicle; Roadside Assistance</Text>
        <Text style={styles.paragraph}>
          LDW (Loss Damage Waiver) and PDW (Partial Damage Waiver) {'\n'}
          LDW and PDW are not insurance, are optional, and may duplicate other coverage you have. If you purchase LDW or PDW, we waive your responsibility for the portion of damage to or loss of the Vehicle as stated on the Face Page. However, damage to or loss of EV charging kits, vehicle jacks, tire repair kits, or similar accessories that are not part of the vehicle itself, is not covered by LDW or PDW, and your responsibility for such damage will not be waived. {'\n\n'}
          PDW IS NOT AVAILABLE IF: {'\n'}
          You provided false, fraudulent, or misleading information before or during the rental, and we would not have rented the Vehicle to you or extended the rental period had we known the true information. {'\n\n'}
          You fail to notify us and the police of an accident, theft, or vandalism involving the Vehicle. {'\n\n'}
          Damage to or loss of the Vehicle is the result of a prohibited use, including but not limited to: {'\n'}
          <Text style={styles.listItem}>• Caused by anyone who is not an Authorized Driver.</Text> {'\n'}
          <Text style={styles.listItem}>• Caused by anyone under the influence of drugs or alcohol.</Text> {'\n'}
          <Text style={styles.listItem}>• Occurs during the commission of a felony or other crime, other than a minor traffic violation.</Text> {'\n'}
          <Text style={styles.listItem}>• Occurs while carrying persons or property for hire, pushing or towing anything, racing, speed testing, contesting, or teaching someone to drive.</Text> {'\n'}
          <Text style={styles.listItem}>• Results from carrying dangerous, hazardous, or illegal materials.</Text> {'\n'}
          <Text style={styles.listItem}>• Results from use outside the specified geographic area, or from Outside Tunisia.</Text> {'\n'}
          <Text style={styles.listItem}>• Caused by driving on unpaved roads.</Text> {'\n'}
          <Text style={styles.listItem}>• Occurs while transporting more persons than the Vehicle has seat belts, carrying persons outside the passenger compartment, or transporting children without approved child safety seats as required by law.</Text> {'\n'}
          <Text style={styles.listItem}>• Occurs when the odometer has been tampered with or disconnected.</Text> {'\n'}
          <Text style={styles.listItem}>• Occurs when the Vehicle’s fluid levels are low, or it is otherwise reasonable to expect you to know that further operation would damage the Vehicle.</Text> {'\n'}
          <Text style={styles.listItem}>• Caused by carrying anything on the roof, trunk, or hood of the Vehicle, by inadequately secured cargo inside the Vehicle, or by an animal transported in the Vehicle.</Text> {'\n'}
          <Text style={styles.listItem}>• Occurs when the Vehicle is unlocked, or the keys or key fob are lost, stolen, or left in the Vehicle when not operating it.</Text> {'\n'}
          <Text style={styles.listItem}>• Caused by anyone lacking experience with a manual transmission, where applicable.</Text> {'\n'}
          <Text style={styles.listItem}>• Results from failure to allow sufficient height or width clearance.</Text> {'\n'}
          <Text style={styles.listItem}>• Results from your willful, wanton, or reckless act or misconduct.</Text> {'\n'}
          <Text style={styles.listItem}>• Results from using the wrong type of fuel for the specific Vehicle.</Text> {'\n'}
          <Text style={styles.listItem}>• Results from driving or operating the Vehicle while using a hand-held wireless communication device or other device capable of receiving or transmitting telephonic communications, electronic data, mail, or text messages while not in a hands-free mode.</Text> {'\n\n'}
          In the event of a loss due to theft of the Vehicle, we will not waive your responsibility for the loss unless you return to us all the Vehicle keys or ignition devices provided at the time of rental.
        </Text>

        <Text style={styles.sectionHeading}>Lost or Damaged Keys or Key Fobs</Text>
        <Text style={styles.paragraph}>
          Even if you purchase LDW or PDW and do not violate the terms detailed in paragraph 6 above, you will still be responsible for the following: {'\n\n'}
          <Text style={styles.listItem}>a) A service fee for replacing the keys or key fob and delivering replacement keys or key fobs, or towing the Vehicle to the nearest Aqwa location if you lose the keys or key fob to the Vehicle.</Text> {'\n\n'}
          <Text style={styles.listItem}>b) A service fee for delivering replacement keys or key fob or towing the Vehicle to the nearest Aqwa location if you lock the keys or key fob in the Vehicle and request assistance from Aqwa, flat tire service, and jumpstarts.</Text> {'\n\n'}
          Roadside Assistance Protection {'\n'}
          Roadside assistance is available to all renters. In some cases, we may offer additional Roadside Assistance Protection. If you purchase the optional Roadside Assistance Protection, we will provide you with 24/7 breakdown assistance (where available) without additional charge. Roadside Assistance Protection includes replacement of lost keys or key fobs, flat tire service, jumpstart, and key lockout services. The cost of a replacement tire is not covered by Roadside Assistance Protection. If you do not purchase Roadside Assistance Protection, you may incur additional costs if we provide the services described above. When deciding whether to purchase Roadside Assistance Protection, you may wish to check whether you have other coverage for these services. Roadside Assistance Protection is not insurance and is optional. Roadside Assistance Protection is void if you are in breach of this agreement, including the prohibited uses in Paragraph 6.
        </Text>

        <Text style={styles.sectionHeading}>Prohibited Uses</Text>
        <Text style={styles.paragraph}>
          Where permitted by law, the following are considered prohibited uses of the Vehicle (“Prohibited Uses”), in addition to the prohibitions listed in the Loss Damage Waiver section, unless granted permission by Aqwa: {'\n\n'}
          <Text style={styles.listItem}>• By anyone without first obtaining Aqwa’s written consent.</Text> {'\n'}
          <Text style={styles.listItem}>• By anyone who is not a qualified and licensed driver.</Text> {'\n'}
          <Text style={styles.listItem}>• To carry persons or property for hire, livery, On-Demand service, or Transportation Network Company (e.g., Indriver, Bolt or Carcharing for business purposes).</Text> {'\n'}
          <Text style={styles.listItem}>• To propel or tow any vehicle, trailer, or other object.</Text> {'\n'}
          <Text style={styles.listItem}>• In any race, test, or contest.</Text> {'\n'}
          <Text style={styles.listItem}>• For any illegal purpose or in the commission of a crime.</Text> {'\n'}
          <Text style={styles.listItem}>• To instruct an unlicensed person in the operation of the vehicle.</Text> {'\n'}
          <Text style={styles.listItem}>• If the vehicle is obtained from Aqwa by fraud or misrepresentation.</Text> {'\n'}
          <Text style={styles.listItem}>• To carry persons other than in the passenger compartment of the Vehicle.</Text> {'\n'}
          <Text style={styles.listItem}>• Loading the vehicle beyond its rated capacity.</Text> {'\n'}
          <Text style={styles.listItem}>• While under the influence of alcohol, drugs, narcotics, or any other physical or mental impairment that adversely affects the driver’s ability to operate the Vehicle.</Text> {'\n'}
          <Text style={styles.listItem}>• Intentionally causing damage to or loss of the Vehicle.</Text> {'\n'}
          <Text style={styles.listItem}>• On other than a paved road or graded private road or driveway.</Text> {'\n'}
          <Text style={styles.listItem}>• In an unsafe, reckless, grossly negligent, or wanton manner. Violating a traffic law or receiving a ticket in an accident is not automatically a violation of this provision, but it may indicate a violation.</Text> {'\n'}
          <Text style={styles.listItem}>• By anyone younger than the minimum age set forth in this agreement.</Text> {'\n'}
          <Text style={styles.listItem}>• Driving the Vehicle outside of the geographic area specified in the Rental Information on Aqwa.com and on your Face Page.</Text> {'\n\n'}
          Prohibited use of the Vehicle violates this agreement, voids all liability and other insurance coverage (where permitted by law), makes the Vehicle subject to immediate recovery by Aqwa, and makes you responsible for all loss of or damage to or connected with the Vehicle, regardless of the cause. This includes but is not limited to Aqwa’s expenses, including loss of use.
        </Text>

        <Text style={styles.sectionHeading}>Charges and Costs</Text>
        <Text style={styles.paragraph}>
          Payment Obligations {'\n'}
          You agree to pay us at or before the conclusion of this rental, or upon demand, all charges due under this Agreement, including those shown on the Face Page and: {'\n\n'}
          <Text style={styles.listItem}>1. A kilometer charge based on our experience if the odometer is tampered with.</Text> {'\n'}
          <Text style={styles.listItem}>2. Any taxes, surcharges, or other government-imposed fees that apply to the transaction.</Text> {'\n'}
          <Text style={styles.listItem}>3. All expenses we incur locating and recovering the Vehicle if you fail to return it, return it to a location other than the one identified by us, or if we repossess the Vehicle under the terms of this Agreement.</Text> {'\n'}
          <Text style={styles.listItem}>4. All costs, including pre- and post-judgment attorney fees, we incur collecting payment from you or otherwise enforcing or defending our rights under this Agreement.</Text> {'\n'}
          <Text style={styles.listItem}>5. A reasonable fee, not to exceed 150,000.000 TND, to clean the Vehicle if returned substantially less clean than when rented or if there is evidence of smoking or vaping in the Vehicle.</Text> {'\n'}
          <Text style={styles.listItem}>6. Towing, impound, storage charges, forfeitures, court costs, penalties, and all other costs we incur resulting from your use of the Vehicle during this rental.</Text> {'\n'}
          <Text style={styles.listItem}>7. Where permitted, airport facility fees and/or concession recovery fees (which may be charged as a percentage of any fee due under this Agreement), vehicle license recovery fees, and other fees and surcharges.</Text> {'\n\n'}
          Special rental rates, vehicle category upgrades, or any equipment or services provided to you free of charge only apply to the initially agreed-upon rental period. If you return the Vehicle after the Due-In Date, you may be charged the standard rates for each day (or partial day) after the Due-In Date, which may be substantially higher than the rates for the initially agreed rental period. You may also be charged standard fees for each day (or partial day) after the Due-In Date for any equipment or services provided to you without charge for the initially agreed-upon rental period. No refund or credit will be issued if you return the Vehicle before the Due-In Date. All charges are subject to a final audit. If errors are found, you authorize us to correct the charges with your payment card issuer. You hereby authorize Aqwa to charge the credit card(s) and/or debit card(s) provided to Aqwa for all amounts owed under this agreement, including advance deposits, incremental authorizations/deposits, and any other amounts owed, as well as payments refused by a third party to whom billing was directed. You also authorize Aqwa to re-initiate any charge to your card(s) that is dishonored for any reason. {'\n\n'}
          Long-Term Reservation Periods {'\n'}
          If a reservation is for a period exceeding twenty-eight (28) consecutive days, it shall consist of consecutive rentals for individual terms of no more than twenty-eight (28) days each ("Rental Period"), but consecutively lasting for the period equal to the reservation period ("LT Reservation Period"). Each Rental Period is a separate rental, distinct from any other Rental Period during the LT Reservation Period. Subsequent rental agreements will be sent to you via email. You must review, electronically sign, and provide the Vehicle’s current kilometer reading for each subsequent rental agreement. You acknowledge that a separate authorization equal to the rental agreement’s gross total plus the security deposit will be processed for every rental agreement in the LT Reservation Period. If the authorization fails, you will be required to provide a different payment method. An Aqwa representative will contact you via phone call and email for three consecutive days, or until you are reached, or you contact Aqwa back. The first two days, you will be informed about the failed authorization. On the third day of no response, you will be informed the Vehicle must be returned to an Aqwa location within 24 hours. Otherwise, the Vehicle will be considered overdue, and the overdue process will commence. Each rental during the LT Reservation Period will be charged the same time and kilometer rate as set forth in the reservation for the initial Rental Period. You acknowledge that any revised agreement will govern each remaining Rental Period if you agree to it. {'\n\n'}
          Change of Return Location {'\n'}
          If you return your Vehicle to a permissible location other than the return address listed on your Face Page without previously informing us, you will be charged a change of location fee of 50.000 TND, in addition to any applicable one-way charges. {'\n\n'}
          Early Return Fee {'\n'}
          If you return your Vehicle earlier than the Due-In time listed at the top of your Face Page without previously informing us, and it reduces the number of rental days by one or more, you may be charged an early return fee of 30.000 TND, in addition to any applicable changes to the daily Rental Day charges. {'\n\n'}
          Late Return Fee {'\n'}
          If you return your Vehicle two hours or more later than the Due-In time listed at the top of this Face Page without previously informing us, you may be charged a late return fee of 100.000 TND, in addition to any applicable changes to the daily Rental Day charges and the number of days charged, if your late return results in an additional rental day(s). If you do not contact us to extend your rental, nothing herein gives you permission to retain possession of the rental vehicle beyond the date and time stated on your Rental Agreement. If you retain possession of the vehicle without contacting us, we will follow our standard overdue process.
        </Text>

        <Text style={styles.sectionHeading}>Deposit</Text>
        <Text style={styles.paragraph}>
          You permit us to reserve an amount up to three times the estimated total charges, but not less than 500,000.000 TND, or the amount listed on the Face Page, against your credit or debit card at the beginning of the rental. For Vehicles in the executive or luxury categories, you authorize us to reserve up to 20,000.000 TND against your credit card. We may use your deposit to pay any amounts owed to us under this Agreement. The deposit amount does not limit in any way the total amount owed to us under this Agreement. We will authorize the release of any excess deposit upon the completion of your rental. Your debit/credit card issuer’s rules will apply to your account being credited for the excess, which may not be immediately available.
        </Text>

        <Text style={styles.sectionHeading}>Text Messages and Phone Calls</Text>
        <Text style={styles.paragraph}>
          By signing the Face Page, you expressly consent for Aqwa or an agent of Aqwa to contact you at the phone number(s) provided in connection with your rental for informational or transactional outreach, including customer surveys. This contact may be made via live, prerecorded, or autodialed emails, calls, or texts. Your consent to receiving these communications is not a condition of any purchase or the execution of your rental agreement.
        </Text>

        <Text style={styles.sectionHeading}>Your Property</Text>
        <Text style={styles.paragraph}>
          You release us, our agents, and employees from all claims for loss of or damage to your personal property, including digital data or information from any mobile device linked to any telematics device or system in the Vehicle, or that of any other person, which we received, handled, stored, or that was left or carried in or on the Vehicle, any service vehicle, or in our offices. This release applies whether or not the loss or damage was caused by our negligence or was otherwise our responsibility. The Vehicle may be equipped with an infotainment system that permits you to pair your mobile devices and may download your personal contacts, communications, location, or other digital data. If you pair your device during the rental, you should unpair it and wipe all personal information from the Vehicle’s systems before returning it.
        </Text>

        <Text style={styles.sectionHeading}>Breach of Agreement</Text>
        <Text style={styles.paragraph}>
          The acts listed in Paragraphs 9 and 10 are prohibited uses of the Vehicle and constitute breaches of this Agreement. You will breach this Agreement if you allow any person other than the Renter or an Authorized Driver to operate the Vehicle. If an Unauthorized Driver damages the Vehicle or injures others, we will hold you responsible for the damage. You waive all recourse against us for any criminal reports or prosecutions taken against you by law enforcement arising from your breach of this Agreement.
        </Text>
      </ScrollView>
      <View style={styles.footer}>
        <View style={styles.optionWrapper}>
          <Text style={styles.optionsTitle}>Total</Text>
          <Text style={styles.optionsTitle}>{total.toFixed(2)} DT</Text>
        </View>
        <Pressable
          style={[styles.find, { backgroundColor: isButtonEnabled ? 'black' : 'grey' }]}
          disabled={!isButtonEnabled}
          onPress={() => navigation.navigate('ReviewAndBook', { total })}
        >
          <Text style={styles.textButton}>Accept and Continue</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default TermsAndConditions;

const styles = StyleSheet.create({
  arrowContainer: {
    paddingHorizontal: 5,
    paddingVertical: 20,
    height: height * 0.1,
  },
  header: {
    height: Platform.OS === 'ios' ? height * 0.12 : height * 0.08,
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#f8f8f8',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: width * 0.04,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  container: {
    flexGrow: 1,
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sectionHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 15,
    lineHeight: 22,
  },
  bold: {
    fontWeight: 'bold',
  },
  listItem: {
    marginLeft: 10,
  },
  optionWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  optionsTitle: {
    fontWeight: '800',
    fontSize: 16,
  },
  find: {
    width: width * 0.93,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    height: 50,
    borderRadius: 15,
    marginBottom: 20,
  },
  footer: {
    backgroundColor: 'white',
  },
  textButton: {
    color: 'white',
    fontSize: 15,
    fontWeight: '700',
  },
});
