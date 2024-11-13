import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions
} from 'react-native';
import RenderHtml from 'react-native-render-html';
import React, {useContext, useRef, useState} from 'react';
import colors from '../../../../Utils/colors';
import {ArrowLeft, ChevDown, ChevUp} from '../../../../Assets/svg';
import {useNavigation} from '@react-navigation/native';
import HeaderUser from '../../../../Components/HeaderUser';
import fonts from '../../../../Utils/fonts';
import {ThemeContext} from '../../../../Components/themeContext';

type Regulation = {
  position: number;
  title: string;
  body?: string;
};

export default function FAQ() {
  const [showEndMessage, setShowEndMessage] = useState(false);
  const {theme,isDarkMode} = useContext(ThemeContext);

  const Regulations: Regulation[] = [
    {
      position: 1,
      title: 'General Conduct',
      body: 'All members must adhere to the code of conduct at all times. This includes treating others with respect, refraining from disruptive behavior, and following all organizational rules.',
    },
    {
      position: 2,
      title: 'Attendance Policy',
      body: 'Regular attendance is required for all scheduled meetings and events. Members must notify the organizer in advance if they are unable to attend.',
    },
    {
      position: 3,
      title: 'Dress Code',
      body: 'Members are expected to dress in business casual attire for all meetings unless otherwise specified. Exceptions can be made for specific events where different attire is appropriate.',
    },
    {
      position: 4,
      title: 'Communication Guidelines',
      body: 'All official communications should be conducted through the approved channels. Personal contact information should not be shared publicly without consent.',
    },
    {
      position: 5,
      title: 'Confidentiality',
      body: 'Members must maintain the confidentiality of all sensitive information shared within the organization. Breaching confidentiality can result in disciplinary action.',
    },
    {
      position: 6,
      title: 'Conflict Resolution',
      body: 'Any disputes or conflicts should be reported to the designated mediator. Efforts should be made to resolve issues amicably and respectfully.',
    },
    {
      position: 7,
      title: 'Use of Facilities',
      body: 'All facilities must be used in a manner that respects the property and the rights of others. Any damages should be reported immediately.',
    },
    {
      position: 8,
      title: 'Harassment Policy',
      body: 'Harassment of any kind will not be tolerated. This includes verbal, physical, and online harassment. Incidents should be reported to the authorities immediately.',
    },
    {
      position: 9,
      title: 'Equal Opportunity',
      body: 'The organization is committed to providing equal opportunities for all members. Discrimination based on race, gender, age, religion, or any other characteristic is prohibited.',
    },
    {
      position: 10,
      title: 'Safety Procedures',
      body: 'All members must adhere to the safety procedures outlined in the safety manual. This includes emergency protocols, use of equipment, and general safety practices.',
    },
    {
      position: 11,
      title: 'Resource Management',
      body: 'Resources should be used efficiently and responsibly. Any misuse or waste of resources should be reported to the management.',
    },
    {
      position: 12,
      title: 'Training and Development',
      body: 'Members are encouraged to participate in training and development programs to enhance their skills and knowledge.',
    },
    {
      position: 13,
      title: 'Feedback Mechanism',
      body: 'Members are encouraged to provide feedback on organizational policies and practices. Feedback can be submitted through the official feedback channels.',
    },
    {
      position: 14,
      title: 'Volunteer Opportunities',
      body: 'Members are encouraged to participate in volunteer opportunities organized by the organization. Volunteering helps in personal development and community engagement.',
    },
    {
      position: 15,
      title: 'Environmental Responsibility',
      body: 'The organization is committed to environmental sustainability. Members should adhere to practices that reduce waste and conserve resources.',
    },
    {
      position: 16,
      title: 'Technology Use',
      body: 'Technology should be used responsibly and ethically. Members should avoid using organizational technology for personal purposes.',
    },
    {
      position: 17,
      title: 'Reporting Misconduct',
      body: "Any misconduct should be reported to the designated authorities immediately. Whistleblowers will be protected under the organization's whistleblower policy.",
    },
    {
      position: 18,
      title: 'Financial Responsibility',
      body: 'Members handling financial transactions must adhere to the financial policies and procedures. Mismanagement of funds will result in disciplinary action.',
    },
    {
      position: 19,
      title: 'Event Participation',
      body: 'Members are encouraged to participate in organizational events. Participation helps in networking and community building.',
    },
    {
      position: 20,
      title: 'Amendments to Regulations',
      body: 'The organization reserves the right to amend these regulations as necessary. Members will be notified of any changes in a timely manner.',
    },
  ];

  const navigation = useNavigation();
  const scrollViewRef = useRef(null);

  const [activeSection, setActiveSection] = useState(0);
  const [Regulaciones, setRegulaciones] = useState<Regulation[] | null>(null);

  const toggleSection = (index: any) => {
    setActiveSection(activeSection === index ? -1 : index);
  };

  return (
    <View style={{flex: 1, backgroundColor: theme.background}}>
      <SafeAreaView />
      <HeaderUser
        text="FAQ’s"
        svg={<ArrowLeft color={theme.text} />}
        onPress={() => navigation.goBack()}
      />
      <Text
        style={[
          styles.unreadCount,
          fonts.B1,
          {paddingLeft: 24, marginTop: 20, color: theme.text},
        ]}>
        Find answers to all frequently asked.
      </Text>
      <ScrollView
        showsVerticalScrollIndicator={false} // Oculta la barra de desplazamiento vertical
        showsHorizontalScrollIndicator={false} // Oculta la barra de desplazamiento horizontal, si es necesario
        style={{
          paddingHorizontal: 20,
          paddingTop: 10,
          backgroundColor: theme.background,
        }}>
        <View style={styles.divider} />
        <ScrollView
          showsVerticalScrollIndicator={false} // Oculta la barra de desplazamiento vertical
          showsHorizontalScrollIndicator={false} // Oculta la barra de desplazamiento horizontal, si es necesario
          style={{
            flex: 0.85,
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            paddingTop: 8,
          }}
          ref={scrollViewRef}>
          <ScrollView
            showsVerticalScrollIndicator={false} // Oculta la barra de desplazamiento vertical
            showsHorizontalScrollIndicator={false} // Oculta la barra de desplazamiento horizontal, si es necesario
            contentInsetAdjustmentBehavior="automatic"
            style={{paddingTop: 8}}>
            {Regulations?.sort((a: any, b: any) => a.position - b.position) // Ordenar por posición
              .map((section: any, index: number) => (
                <View
                  key={section.position}
                  style={[
                    styles.sectionContainer,
                    {backgroundColor: theme.background},
                  ]}>
                  <TouchableOpacity
                    onPress={() => toggleSection(index)}
                    style={[
                      styles.sectionHeader,
                      {borderColor: isDarkMode ? '#2F2F2F' : '#E6E6E6'},
                    ]}>
                    <Text
                      style={[
                        styles.sectionTitle,
                        fonts.H5,
                        {color: theme.text},
                      ]}>
                      {section.title}
                    </Text>
                    <View
                      style={{
                        justifyContent: 'flex-end',
                        alignContent: 'flex-end',
                        alignItems: 'flex-end',
                        flex: 1,
                      }}>
                      {activeSection === index ? (
                        <ChevUp color={theme.text} />
                      ) : (
                        <ChevDown color={theme.text} />
                      )}
                    </View>
                  </TouchableOpacity>
                  {activeSection === index && (
                    <View style={styles.sectionContent}>
                      {/* Usar el cuerpo de la sección del response */}
                      {section.body && (
                        <Text
                          style={[
                            styles.sectionText,
                            {color: theme.text},
                            fonts.B5,
                          ]}>
                          {section.body}
                        </Text>
                      )}
                    </View>
                  )}
                </View>
              ))}
          </ScrollView>

          <></>
        </ScrollView>
        <View style={styles.divider} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  chatContent: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  name: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  message: {
    color: 'gray',
  },
  metaData: {
    alignItems: 'flex-end',
  },
  time: {
    color: 'gray',
  },
  unreadContainer: {
    backgroundColor: colors.secondary.light,
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 10,
    minWidth: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
  unreadCount: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    marginVertical: 2,
  },
  chatContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },

  //

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    shadowColor: colors.neutral.darkest,
  },
  svg: {
    marginRight: 8,
  },
  text: {
    fontSize: 16,
    color: colors.neutral.darkest,
  },
  container: {
    padding: 16,
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '50%',

    padding: 20,
    borderRadius: 20,
  },
  mainText: {
    color: colors.neutral.white,
    marginBottom: 10,
  },
  subtitle: {
    color: colors.neutral.white,
    marginBottom: 20,
    paddingHorizontal: 50,
    textAlign: 'center',
  },
  upgradeButton: {
    backgroundColor: colors.primary.medium,
    paddingVertical: 10,
    paddingHorizontal: 90,
    borderRadius: 20,
  },
  upgradeText: {
    color: colors.neutral.white,
    fontWeight: 'bold',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    height: '100%',
    zIndex: 10,
  },
  sectionContainer: {
    marginVertical: 8,
    paddingVertical: 12,
    borderRadius: 8,
  },
  sectionHeader: {
    borderBottomWidth: 1,
    paddingBottom: 8,
    flexDirection: 'row',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionContent: {
    marginTop: 8,
  },
  sectionText: {
    fontSize: 16,
  },
});
