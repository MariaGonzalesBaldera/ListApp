import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Closeb } from '../../Assets/svg';
import fonts from '../../Utils/fonts';
import colors from '../../Utils/colors';
import { useNavigation } from '@react-navigation/native'; // Importar hook de navegación si es necesario
import { AcceptInvitation, RejectInvitation } from '../../Services/Events/Events';

interface PDFIframeProps {
  urlPDF: string;
  fileUrlMobile?: string;
}

interface NotificationCardProps {
  colors: any;
  buttonType: 'single' | 'double';
  titlewhite: string;
  titleblue?: string;
  subititle: string;
  style?: object;
  ticketId?: string;
  event: any;
}

const NotificationCard: React.FC<NotificationCardProps> = ({ 
  buttonType, 
  titlewhite, 
  titleblue = '', 
  subititle, 
  style,
  ticketId='',
  event
}) => {
  const navigation = useNavigation();
  const rejectInvitation = async (ticketId: string) => {
    const response  = await RejectInvitation(ticketId)
    console.log(response)
  }
  const accepInvitation = async (ticketId: string) => {
    const response = await AcceptInvitation(ticketId)
    console.log(response)
  }
  return (
    <View style={[localStyles.container, style, { backgroundColor: colors.neutral.darkest }]}>
      <View style={localStyles.content}>
        <View style={localStyles.header}>
          <View>
            <Text style={[localStyles.cardone, fonts.H5]}>
              {titlewhite} <Text style={{ color: colors.secondary.medium }}>{titleblue}</Text>
            </Text>
            <Text style={[localStyles.cardtwo, fonts.B5]}>{subititle}</Text>
          </View>
          <TouchableOpacity>
            <Closeb />
          </TouchableOpacity>
        </View>
        
        {buttonType === 'single' ? (
          <TouchableOpacity
            style={localStyles.singleButton}
            onPress={() => navigation.navigate('rematch')}
          >
            <Text style={[localStyles.upgradeText, fonts.Btn]}>View</Text>
          </TouchableOpacity>
        ) : (
          <View style={localStyles.doubleButtonContainer}>
            <TouchableOpacity
              style={[localStyles.doubleButton, localStyles.goToEventButton]}
              onPress={() => {
                accepInvitation(ticketId)
              }}
            >
              <Text style={[localStyles.doubleButtonText, fonts.Btn]}>Yes, I want to go</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[localStyles.doubleButton, localStyles.getTicketButton]}
              onPress={() => {
                rejectInvitation(ticketId)
              }}
            >
              <Text style={[localStyles.doubleButtonText2, fonts.Btn]}>No, thanks</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const localStyles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  content: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  singleButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: colors.primary.medium,
    alignItems: 'center',
    borderRadius: 12,
  },
  upgradeText: {
    color: colors.neutral.white,
  },
  doubleButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  doubleButton: {
    flex: 0.48,
    padding: 10,
    alignItems: 'center',
    borderRadius: 40,
  },
  goToEventButton: {
    backgroundColor: colors.primary.medium,
  },
  getTicketButton: {
    backgroundColor: colors.neutral.white,
  },
  doubleButtonText: {
    color: colors.neutral.white,
  },
  doubleButtonText2: {
    color: colors.neutral.darkest,
  },
  cardone: {
    color: colors.neutral.white,
  },
  cardtwo: {
    color: colors.neutral.medium,
  },
});

export default NotificationCard;
