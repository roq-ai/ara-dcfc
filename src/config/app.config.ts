interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
  ownerAbilities: string[];
  customerAbilities: string[];
  getQuoteUrl: string;
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Owner'],
  customerRoles: [],
  tenantRoles: ['Owner', 'HR Manager', 'Employee', 'Team Lead', 'Contractor'],
  tenantName: 'Company',
  applicationName: 'Ara',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
  customerAbilities: [],
  ownerAbilities: [
    'Manage users',
    'Manage companies',
    'Manage contractors',
    'Manage employees',
    'Manage teams',
    'Manage HR managers',
  ],
  getQuoteUrl: 'https://app.roq.ai/proposal/a1c56fa8-6b41-420f-b6f1-ff5a85a2db48',
};
