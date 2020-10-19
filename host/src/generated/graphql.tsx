import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  getProfile?: Maybe<Profile>;
  getProfiles: Array<Profile>;
  anonymizeProfile: Profile;
  getProfileOwnerConfig: ProfileOwnerConfig;
  getDataOwner: DataOwner;
  getUserSettings?: Maybe<UserSettings>;
};


export type QueryGetProfileArgs = {
  hotelId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  contextId?: Maybe<Scalars['String']>;
  context?: Maybe<ContextEnum>;
};


export type QueryGetProfilesArgs = {
  hotelId: Scalars['String'];
  ids: Array<Scalars['String']>;
};


export type QueryAnonymizeProfileArgs = {
  hotelId: Scalars['String'];
  id: Scalars['String'];
};


export type QueryGetProfileOwnerConfigArgs = {
  hotelId: Scalars['String'];
};


export type QueryGetDataOwnerArgs = {
  dataOwnerId: Scalars['String'];
};


export type QueryGetUserSettingsArgs = {
  contextId: Scalars['String'];
  context: UserSettingsContextEnum;
};

export type Profile = {
  __typename?: 'Profile';
  id: Scalars['ID'];
  hotelId: Array<Scalars['String']>;
  dataOwnerId?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  createDateTime?: Maybe<Scalars['String']>;
  lastModifyDateTime?: Maybe<Scalars['String']>;
  purgeDate?: Maybe<Scalars['String']>;
  profileType?: Maybe<Scalars['String']>;
  gender?: Maybe<GenderTypeEnum>;
  maritalStatus?: Maybe<MaritalStatusTypeEnum>;
  birthDate?: Maybe<Scalars['String']>;
  language?: Maybe<Scalars['String']>;
  surname?: Maybe<Scalars['String']>;
  givenName?: Maybe<Scalars['String']>;
  middleName?: Maybe<Scalars['String']>;
  namePrefix?: Maybe<Scalars['String']>;
  nameSufix?: Maybe<Scalars['String']>;
  nameTitle?: Maybe<Scalars['String']>;
  jobTitle?: Maybe<Scalars['String']>;
  companyName?: Maybe<Scalars['String']>;
  misc?: Maybe<Scalars['String']>;
  phones?: Maybe<Array<Phone>>;
  emails?: Maybe<Array<Email>>;
  addresses?: Maybe<Array<Address>>;
  ownerDetails?: Maybe<ProfileOwnerConfig>;
};

export enum GenderTypeEnum {
  Male = 'Male',
  Female = 'Female',
  Unknown = 'Unknown'
}

export enum MaritalStatusTypeEnum {
  Annulled = 'Annulled',
  Cohabitating = 'Cohabitating',
  Divorced = 'Divorced',
  Engaged = 'Engaged',
  Married = 'Married',
  Separated = 'Separated',
  Single = 'Single',
  Unknown = 'Unknown',
  Widowed = 'Widowed'
}

export type Phone = {
  __typename?: 'Phone';
  shareMarketInd?: Maybe<ShareMarketIndEnum>;
  shareSynchInd?: Maybe<ShareSynchIndEnum>;
  formattedInd?: Maybe<Scalars['Int']>;
  phoneTechType?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  areaCityCode?: Maybe<Scalars['Float']>;
  countryAccessCode?: Maybe<Scalars['Float']>;
  extension?: Maybe<Scalars['Float']>;
  phoneLocationType?: Maybe<Scalars['String']>;
  phoneUseType?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
};

export enum ShareMarketIndEnum {
  No = 'No',
  Yes = 'Yes',
  Inherit = 'Inherit'
}

export enum ShareSynchIndEnum {
  No = 'No',
  Yes = 'Yes',
  Inherit = 'Inherit'
}

export type Email = {
  __typename?: 'Email';
  shareMarketInd?: Maybe<ShareMarketIndEnum>;
  shareSynchInd?: Maybe<ShareSynchIndEnum>;
  formattedInd?: Maybe<Scalars['Int']>;
  emailType?: Maybe<Scalars['String']>;
  emailAddress?: Maybe<Scalars['String']>;
  textFormat?: Maybe<Scalars['String']>;
  validInd?: Maybe<Scalars['Int']>;
  defaultInd?: Maybe<Scalars['Int']>;
};

export type Address = {
  __typename?: 'Address';
  shareMarketInd?: Maybe<ShareMarketIndEnum>;
  shareSynchInd?: Maybe<ShareSynchIndEnum>;
  formattedInd?: Maybe<Scalars['Int']>;
  useType?: Maybe<Scalars['String']>;
  validationStatus?: Maybe<Scalars['String']>;
  validInd?: Maybe<Scalars['Int']>;
  streetNmbr?: Maybe<Scalars['String']>;
  addressLine?: Maybe<Scalars['String']>;
  stateProv?: Maybe<Scalars['String']>;
  stateCode?: Maybe<Scalars['String']>;
  county?: Maybe<Scalars['String']>;
  postalCode?: Maybe<Scalars['String']>;
  cityName?: Maybe<Scalars['String']>;
  countryCode?: Maybe<Scalars['String']>;
  countryName?: Maybe<Scalars['String']>;
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
  formattedAddress?: Maybe<Scalars['String']>;
};

export type ProfileOwnerConfig = {
  __typename?: 'ProfileOwnerConfig';
  hotelId: Scalars['String'];
  dataOwnerId: Scalars['String'];
  dataOwnerName?: Maybe<Scalars['String']>;
  dataOwnerType?: Maybe<Scalars['String']>;
  storageLocation?: Maybe<Scalars['String']>;
  migrationFilename?: Maybe<MigrationFilename>;
  underMigration?: Maybe<Scalars['Boolean']>;
  createDateTime?: Maybe<Scalars['String']>;
  lastModifyDateTime?: Maybe<Scalars['String']>;
};

export type MigrationFilename = {
  __typename?: 'MigrationFilename';
  moveFilename: Scalars['String'];
  moveStatus?: Maybe<MigrationStatusEnum>;
  copyFilename: Scalars['String'];
  copyStatus?: Maybe<MigrationStatusEnum>;
};

export enum MigrationStatusEnum {
  Initiated = 'Initiated',
  Processing = 'Processing',
  Done = 'Done'
}

export enum ContextEnum {
  HotelReservation = 'HotelReservation',
  Hotel = 'Hotel',
  User = 'User'
}

export type DataOwner = {
  __typename?: 'DataOwner';
  dataOwnerId: Scalars['String'];
  dataOwnerName?: Maybe<Scalars['String']>;
  dataOwnerType?: Maybe<Scalars['String']>;
  storageLocation?: Maybe<Scalars['String']>;
  createDateTime?: Maybe<Scalars['String']>;
  lastModifyDateTime?: Maybe<Scalars['String']>;
};

export type UserSettings = {
  __typename?: 'UserSettings';
  context: Scalars['String'];
  contextId: Scalars['String'];
  language?: Maybe<Scalars['String']>;
  dateFormat?: Maybe<Scalars['String']>;
  displayType?: Maybe<Scalars['String']>;
  landingPage?: Maybe<Scalars['String']>;
  createDateTime?: Maybe<Scalars['String']>;
  lastModifyDateTime?: Maybe<Scalars['String']>;
};

export enum UserSettingsContextEnum {
  User = 'User'
}

export type Mutation = {
  __typename?: 'Mutation';
  storeProfile: StoreProfileResponse;
  updateProfile: Profile;
  storeProfileOwnerConfig: ProfileOwnerConfig;
  addDataOwner: DataOwner;
  saveUserSettings: UserSettings;
  deleteUserSettings: Scalars['Boolean'];
};


export type MutationStoreProfileArgs = {
  createProfileData: StoreProfileInput;
};


export type MutationUpdateProfileArgs = {
  updateProfileData: UpdateProfileInput;
};


export type MutationStoreProfileOwnerConfigArgs = {
  createProfileOwnerConfigData: ProfileOwnerConfigInput;
};


export type MutationAddDataOwnerArgs = {
  data: DataOwnerInput;
};


export type MutationSaveUserSettingsArgs = {
  input: UserSettingsInput;
};


export type MutationDeleteUserSettingsArgs = {
  contextId: Scalars['String'];
  context: UserSettingsContextEnum;
};

export type StoreProfileResponse = {
  __typename?: 'StoreProfileResponse';
  batchId: Scalars['String'];
  context: ContextEnum;
  contextId: Scalars['String'];
  hotelId?: Maybe<Scalars['String']>;
  webhookUrl?: Maybe<Scalars['String']>;
  profiles: Array<ProfileResponse>;
};

export type ProfileResponse = {
  __typename?: 'ProfileResponse';
  id: Scalars['String'];
};

export type StoreProfileInput = {
  context: ContextEnum;
  contextId: Scalars['String'];
  hotelId?: Maybe<Scalars['String']>;
  webhookUrl?: Maybe<Scalars['String']>;
  profiles: Array<ProfileInput>;
};

export type ProfileInput = {
  id?: Maybe<Scalars['ID']>;
  hotelId?: Maybe<Scalars['String']>;
  profileType?: Maybe<ProfileTypeEnum>;
  gender?: Maybe<GenderTypeEnum>;
  maritalStatus?: Maybe<MaritalStatusTypeEnum>;
  birthDate?: Maybe<Scalars['String']>;
  language?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  surname?: Maybe<Scalars['String']>;
  givenName?: Maybe<Scalars['String']>;
  middleName?: Maybe<Scalars['String']>;
  namePrefix?: Maybe<Scalars['String']>;
  nameSufix?: Maybe<Scalars['String']>;
  nameTitle?: Maybe<Scalars['String']>;
  jobTitle?: Maybe<Scalars['String']>;
  companyName?: Maybe<Scalars['String']>;
  companyCode?: Maybe<Scalars['String']>;
  companyCodeContext?: Maybe<Scalars['String']>;
  phone?: Maybe<PhoneInput>;
  phones?: Maybe<Array<PhoneInput>>;
  email?: Maybe<EmailInput>;
  emails?: Maybe<Array<EmailInput>>;
  address?: Maybe<AddressInput>;
  addresses?: Maybe<Array<AddressInput>>;
};

export enum ProfileTypeEnum {
  Prt_1 = 'PRT_1',
  Prt_2 = 'PRT_2',
  Prt_3 = 'PRT_3',
  Prt_4 = 'PRT_4',
  Prt_5 = 'PRT_5',
  Prt_6 = 'PRT_6',
  Prt_7 = 'PRT_7',
  Prt_8 = 'PRT_8',
  Prt_9 = 'PRT_9',
  Prt_10 = 'PRT_10',
  Prt_11 = 'PRT_11',
  Prt_12 = 'PRT_12',
  Prt_13 = 'PRT_13',
  Prt_14 = 'PRT_14',
  Prt_15 = 'PRT_15',
  Prt_16 = 'PRT_16',
  Prt_17 = 'PRT_17',
  Prt_18 = 'PRT_18',
  Prt_19 = 'PRT_19',
  Prt_20 = 'PRT_20',
  Prt_21 = 'PRT_21',
  Prt_22 = 'PRT_22',
  Prt_23 = 'PRT_23'
}

export type PhoneInput = {
  shareMarketInd?: Maybe<ShareMarketIndEnum>;
  shareSynchInd?: Maybe<ShareSynchIndEnum>;
  formattedInd?: Maybe<Scalars['Int']>;
  phoneTechType?: Maybe<PhoneTechTypeEnum>;
  phoneNumber?: Maybe<Scalars['String']>;
  areaCityCode?: Maybe<Scalars['Float']>;
  countryAccessCode?: Maybe<Scalars['Float']>;
  extension?: Maybe<Scalars['Float']>;
  phoneLocationType?: Maybe<PhoneLocationTypeEnum>;
  phoneUseType?: Maybe<PhoneUseTypeEnum>;
  id?: Maybe<Scalars['String']>;
};

export enum PhoneTechTypeEnum {
  Voice = 'Voice',
  Data = 'Data',
  Fax = 'Fax',
  Pager = 'Pager',
  Mobile = 'Mobile',
  Tty = 'TTY',
  Telex = 'Telex',
  VoIp = 'VoIP'
}

export enum PhoneLocationTypeEnum {
  BrandReservationsOffice = 'BrandReservationsOffice',
  CentralReservationsOffice = 'CentralReservationsOffice',
  PropertyReservationOffice = 'PropertyReservationOffice',
  PropertyDirect = 'PropertyDirect',
  SalesOffice = 'SalesOffice',
  Home = 'Home',
  Office = 'Office',
  Other = 'Other',
  ManagingCompany = 'ManagingCompany',
  Mobile = 'Mobile'
}

export enum PhoneUseTypeEnum {
  EmergencyContact = 'EmergencyContact',
  TravelArranger = 'TravelArranger',
  DaytimeContact = 'DaytimeContact',
  EveningContact = 'EveningContact',
  Contact = 'Contact',
  TollFreeNumber = 'TollFreeNumber',
  GuestUse = 'GuestUse',
  PickupContact = 'PickupContact',
  ElectronicDocumentReference = 'ElectronicDocumentReference',
  Mobile = 'Mobile'
}

export type EmailInput = {
  shareMarketInd?: Maybe<ShareMarketIndEnum>;
  shareSynchInd?: Maybe<ShareSynchIndEnum>;
  formattedInd?: Maybe<Scalars['Int']>;
  emailType?: Maybe<EmailAddressTypeEnum>;
  emailAddress?: Maybe<Scalars['String']>;
  textFormat?: Maybe<Scalars['String']>;
  validInd?: Maybe<Scalars['Int']>;
  defaultInd?: Maybe<Scalars['Int']>;
};

export enum EmailAddressTypeEnum {
  Personal = 'Personal',
  Business = 'Business',
  Listserve = 'Listserve'
}

export type AddressInput = {
  shareMarketInd?: Maybe<ShareMarketIndEnum>;
  shareSynchInd?: Maybe<ShareSynchIndEnum>;
  formattedInd?: Maybe<Scalars['Int']>;
  useType?: Maybe<AddressUseTypeEnum>;
  validationStatus?: Maybe<Scalars['String']>;
  validInd?: Maybe<Scalars['Int']>;
  streetNmbr?: Maybe<Scalars['String']>;
  addressLine?: Maybe<Scalars['String']>;
  stateProv?: Maybe<Scalars['String']>;
  stateCode?: Maybe<Scalars['String']>;
  county?: Maybe<Scalars['String']>;
  postalCode?: Maybe<Scalars['String']>;
  cityName?: Maybe<Scalars['String']>;
  countryCode?: Maybe<Scalars['String']>;
  countryName?: Maybe<Scalars['String']>;
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
  formattedAddress?: Maybe<Scalars['String']>;
};

export enum AddressUseTypeEnum {
  Delivery = 'Delivery',
  Mailing = 'Mailing',
  Billing = 'Billing',
  CreditCard = 'CreditCard',
  Other = 'Other',
  Contact = 'Contact',
  Physical = 'Physical',
  PreOpeningOffice = 'PreOpeningOffice',
  Collection = 'Collection',
  Chain = 'Chain',
  Deposit = 'Deposit',
  Hotel = 'Hotel',
  Permanent = 'Permanent'
}

export type UpdateProfileInput = {
  id: Scalars['ID'];
  hotelId: Scalars['String'];
  profileType?: Maybe<ProfileTypeEnum>;
  gender?: Maybe<GenderTypeEnum>;
  maritalStatus?: Maybe<MaritalStatusTypeEnum>;
  birthDate?: Maybe<Scalars['String']>;
  language?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  surname?: Maybe<Scalars['String']>;
  givenName?: Maybe<Scalars['String']>;
  middleName?: Maybe<Scalars['String']>;
  namePrefix?: Maybe<Scalars['String']>;
  nameSufix?: Maybe<Scalars['String']>;
  nameTitle?: Maybe<Scalars['String']>;
  jobTitle?: Maybe<Scalars['String']>;
  companyName?: Maybe<Scalars['String']>;
  companyCode?: Maybe<Scalars['String']>;
  companyCodeContext?: Maybe<Scalars['String']>;
  phone?: Maybe<PhoneInput>;
  phones?: Maybe<Array<PhoneInput>>;
  email?: Maybe<EmailInput>;
  emails?: Maybe<Array<EmailInput>>;
  address?: Maybe<AddressInput>;
  addresses?: Maybe<Array<AddressInput>>;
};

export type ProfileOwnerConfigInput = {
  dataOwnerId: Scalars['String'];
  dataOwnerName?: Maybe<Scalars['String']>;
  dataOwnerType?: Maybe<Scalars['String']>;
  storageLocation?: Maybe<Scalars['String']>;
  hotelId: Scalars['String'];
};

export type DataOwnerInput = {
  dataOwnerId: Scalars['String'];
  dataOwnerName?: Maybe<Scalars['String']>;
  dataOwnerType?: Maybe<Scalars['String']>;
  storageLocation?: Maybe<Scalars['String']>;
};

export type UserSettingsInput = {
  context: UserSettingsContextEnum;
  contextId: Scalars['String'];
  language?: Maybe<UserSettingsLangEnum>;
  dateFormat?: Maybe<DateFormatEnum>;
  displayType?: Maybe<DisplayTypeEnum>;
  landingPage?: Maybe<LandingPageEnum>;
};

export enum UserSettingsLangEnum {
  En = 'EN',
  De = 'DE',
  Fr = 'FR',
  Nl = 'NL',
  Es = 'ES'
}

export enum DateFormatEnum {
  Ddmmyyyy = 'DDMMYYYY',
  Yyyymmdd = 'YYYYMMDD',
  YyyyMmDd = 'YYYY_MM_DD'
}

export enum DisplayTypeEnum {
  Normal = 'Normal',
  Compressed = 'Compressed'
}

export enum LandingPageEnum {
  Home = 'Home',
  Hotel = 'Hotel',
  Bookingchannels = 'Bookingchannels',
  Custombigtable = 'Custombigtable',
  Inventories = 'Inventories',
  BookingrulesHotel = 'BookingrulesHotel',
  BookingrulesGuestrooms = 'BookingrulesGuestrooms',
  BookingrulesRateplans = 'BookingrulesRateplans',
  BookingrulesSellableproducts = 'BookingrulesSellableproducts',
  Rates = 'Rates',
  ReservationsNew = 'ReservationsNew',
  ReservationsSearch = 'ReservationsSearch'
}

export type Subscription = {
  __typename?: 'Subscription';
  onCreateBatch?: Maybe<StoreProfileResponse>;
  onUpdateProfile?: Maybe<Profile>;
};

export type Basic = {
  __typename?: 'Basic';
  shareMarketInd?: Maybe<ShareMarketIndEnum>;
  shareSynchInd?: Maybe<ShareSynchIndEnum>;
  formattedInd?: Maybe<Scalars['Int']>;
};

export type ProfileFilter = {
  id?: Maybe<Scalars['String']>;
  hotelId?: Maybe<Scalars['String']>;
  context: ContextEnum;
  contextId?: Maybe<Scalars['String']>;
};

export type BasicInput = {
  shareMarketInd?: Maybe<ShareMarketIndEnum>;
  shareSynchInd?: Maybe<ShareSynchIndEnum>;
  formattedInd?: Maybe<Scalars['Int']>;
};

export type GetProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProfileQuery = (
  { __typename?: 'Query' }
  & { getProfile?: Maybe<(
    { __typename?: 'Profile' }
    & Pick<Profile, 'id' | 'givenName' | 'language' | 'lastModifyDateTime' | 'maritalStatus' | 'middleName'>
  )> }
);


export const GetProfileDocument = gql`
    query GetProfile {
  getProfile(context: User, contextId: "test-UserID") {
    id
    givenName
    language
    lastModifyDateTime
    maritalStatus
    middleName
  }
}
    `;

/**
 * __useGetProfileQuery__
 *
 * To run a query within a React component, call `useGetProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetProfileQuery(baseOptions?: Apollo.QueryHookOptions<GetProfileQuery, GetProfileQueryVariables>) {
        return Apollo.useQuery<GetProfileQuery, GetProfileQueryVariables>(GetProfileDocument, baseOptions);
      }
export function useGetProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProfileQuery, GetProfileQueryVariables>) {
          return Apollo.useLazyQuery<GetProfileQuery, GetProfileQueryVariables>(GetProfileDocument, baseOptions);
        }
export type GetProfileQueryHookResult = ReturnType<typeof useGetProfileQuery>;
export type GetProfileLazyQueryHookResult = ReturnType<typeof useGetProfileLazyQuery>;
export type GetProfileQueryResult = Apollo.QueryResult<GetProfileQuery, GetProfileQueryVariables>;

      export interface IntrospectionResultData {
        __schema: {
          types: {
            kind: string;
            name: string;
            possibleTypes: {
              name: string;
            }[];
          }[];
        };
      }
      const result: IntrospectionResultData = {
  "__schema": {
    "types": []
  }
};
      export default result;
    