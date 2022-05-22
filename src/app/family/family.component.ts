import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-family',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.sass'],
})
export class FamilyComponent implements OnInit {
  selectedMember = 0;
  familyMembers = [
    {
      name: 'Mehdi',
      description: 'Proud indian father, Angular developer and camel breeder',
      image: '../../assets/images/Mehdi.jpeg',
    },
    {
      name: 'Abdam',
      description: 'Proud indian child and Buhdda follower',
      image: '../../assets/images/Abdam.webp',
    },
    {
      name: 'Anjali',
      description: 'Proud indian wife and professional Rissotto cooker',
      image: '../../assets/images/Anjali.jpg',
    },
    {
      name: 'Brownie',
      description: 'Proud indian camel and follower of Allah',
      image: '../../assets/images/Brownie.gif',
    },
  ];

  constructor() {}

  move(value: number) {
    if (this.selectedMember + value < 0) {
      this.selectedMember = 3;
    } else if (this.selectedMember + value > 3) {
      this.selectedMember = 0;
    } else {
      this.selectedMember += value;
    }
  }

  ngOnInit(): void {}
}
