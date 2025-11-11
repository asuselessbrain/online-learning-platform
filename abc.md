# Address Table

| Device / Router           | Interface     | IP Address        | Subnet Mask           | Default Gateway   |
|---------------------------|---------------|-------------------|------------------------|-------------------|
| **Distribution Router 1** | GE0/0         | 10.28.88.2        | 255.255.255.248        | —                 |
|                           | GE2/0.10      | 10.28.32.1        | 255.255.248.0          | —                 |
|                           | GE2/0.20      | 10.28.64.1        | 255.255.252.0          | —                 |
|                           | GE2/0.30      | 10.28.80.1        | 255.255.254.0          | —                 |
| **Distribution Router 2** | GE0/0         | 10.28.88.10       | 255.255.255.248        | —                 |
|                           | GE2/0.10      | 10.28.40.1        | 255.255.248.0          | —                 |
|                           | GE2/0.20      | 10.28.68.1        | 255.255.252.0          | —                 |
|                           | GE2/0.30      | 10.28.82.1        | 255.255.254.0          | —                 |
| **Distribution Router 3** | GE0/0         | 10.28.88.18       | 255.255.255.248        | —                 |
|                           | GE2/0.10      | 10.28.48.1        | 255.255.248.0          | —                 |
|                           | GE2/0.20      | 10.28.72.1        | 255.255.252.0          | —                 |
|                           | GE2/0.30      | 10.28.84.1        | 255.255.254.0          | —                 |
| **Core Router**           | GE0/0         | 10.28.88.1        | 255.255.255.248        | —                 |
|                           | GE0/1         | 10.28.88.9        | 255.255.255.248        | —                 |
|                           | GE0/2         | 10.28.88.17       | 255.255.255.248        | —                 |
|                           | GE0/3         | 103.133.254.4     | 255.255.255.0          | —                 |
| **Remote Core Router**    | GE0/0         | 103.133.254.1     | 255.255.255.0          | —                 |
| **DNS Server**            | —             | 103.133.254.2     | 255.255.255.0          | 103.133.254.1     |
| **PC 0**                  | —             | 103.133.254.3     | 255.255.255.0          | 103.133.254.1     |


# Core Router Configuration

```bash
enable
configure terminal

! ------------------------------
! IP Addressing for Interfaces
! ------------------------------
interface GigabitEthernet0/0
 ip address 10.28.88.1 255.255.255.248
 no shutdown
 exit

interface GigabitEthernet0/1
 ip address 10.28.88.9 255.255.255.248
 no shutdown
 exit

interface GigabitEthernet0/2
 ip address 10.28.88.17 255.255.255.248
 no shutdown
 exit

interface GigabitEthernet0/3
 ip address 103.133.254.4 255.255.255.0
 no shutdown
 exit

! ------------------------------
! Static Route (Internet Access)
! ------------------------------
ip route 0.0.0.0 0.0.0.0 103.133.254.1

! ------------------------------
! BGP Configuration (AS 65002)
! ------------------------------
router bgp 65002
 bgp log-neighbor-changes
 neighbor 103.133.254.1 remote-as 65001
 network 103.133.254.0 mask 255.255.255.0
 exit

! ------------------------------
! OSPF Configuration (Areas 0,1,2)
! ------------------------------
router ospf 1
 router-id 1.2.3.0
 log-adjacency-changes
 default-information originate
 
 ! Area 0 - Building 1 Link
 network 10.28.88.0 0.0.0.7 area 0
 
 ! Area 1 - Building 2 Link
 network 10.28.88.8 0.0.0.7 area 1
 
 ! Area 2 - Building 3 Link
 network 10.28.88.16 0.0.0.7 area 2

 redistribute bgp 65002 subnets
 exit

end
write memory


# Distribution Router 2 Configuration

```bash
enable
configure terminal

! ------------------------------
! IP Addressing for Interfaces
! ------------------------------
interface GigabitEthernet0/0
 ip address 10.28.88.10 255.255.255.248
 no shutdown
 exit

interface GigabitEthernet2/0.10
 encapsulation dot1Q 10
 ip address 10.28.40.1 255.255.248.0
 no shutdown
 exit

interface GigabitEthernet2/0.20
 encapsulation dot1Q 20
 ip address 10.28.68.1 255.255.252.0
 no shutdown
 exit

interface GigabitEthernet2/0.30
 encapsulation dot1Q 30
 ip address 10.28.82.1 255.255.254.0
 no shutdown
 exit


! ------------------------------
! DHCP Pools
! ------------------------------

! Student VLAN DHCP
ip dhcp pool Student_Pool
 network 10.28.40.0 255.255.248.0
 default-router 10.28.40.1
 dns-server 103.133.254.2
 exit
ip dhcp excluded-address 10.28.40.1
ip dhcp excluded-address 10.28.47.254 10.28.47.255

! Teacher VLAN DHCP
ip dhcp pool Teacher_Pool
 network 10.28.68.0 255.255.252.0
 default-router 10.28.68.1
 dns-server 103.133.254.2
 exit
ip dhcp excluded-address 10.28.68.1
ip dhcp excluded-address 10.28.71.254 10.28.71.255

! Academic VLAN DHCP
ip dhcp pool Academic_Pool
 network 10.28.82.0 255.255.254.0
 default-router 10.28.82.1
 dns-server 103.133.254.2
 exit
ip dhcp excluded-address 10.28.82.1
ip dhcp excluded-address 10.28.83.254 10.28.83.255


! ------------------------------
! OSPF Configuration (Area 1)
! ------------------------------
router ospf 1
 router-id 2.2.2.2
 log-adjacency-changes
 default-information originate
 
 network 10.28.40.0 0.0.7.255 area 1
 network 10.28.68.0 0.0.3.255 area 1
 network 10.28.82.0 0.0.1.255 area 1
 network 10.28.88.8 0.0.0.7 area 1
 exit

end
write memory

enable
configure terminal

! Create VLANs
vlan 10
 name Student
 exit
vlan 20
 name Teacher
 exit
vlan 30
 name Academic
 exit

! Assign access ports (FastEthernet0/1–24)
interface range FastEthernet0/1 - 8
 switchport mode access
 switchport access vlan 10
 no shutdown
 exit

interface range FastEthernet0/9 - 16
 switchport mode access
 switchport access vlan 20
 no shutdown
 exit

interface range FastEthernet0/17 - 24
 switchport mode access
 switchport access vlan 30
 no shutdown
 exit

! Configure trunk on GigabitEthernet uplink
! (Assuming Gig0/1 connects to router GE2/0)
interface GigabitEthernet0/1
 switchport trunk encapsulation dot1Q
 switchport mode trunk
 switchport trunk allowed vlan 10,20,30
 no shutdown
 exit

end
write memory

