// import { useQueryClient } from '@tanstack/react-query';
// import React from 'react';
// import styled from 'styled-components';
// import tw from 'twin.macro';
// import { delRegisteredStudentApi } from '../../../../api/mypageApi';

// export default function MyPageStudentListItem(props) {
//   const queryClient = useQueryClient();
//   const { student } = props;

//   const onDeleteRegister = async () => {
//     console.log('qwdwq');
//     await delRegisteredStudentApi(student.num);
//     await queryClient.invalidateQueries({ queryKey: ['registerdStudents'] });
//   };
//   return (
//     <S.StudentBox>
//       <td>{student.studentName}</td>
//       <td>{student.studentId}</td>
//       <td>
//         <S.DeleteButton onClick={onDeleteRegister}>등록 해제</S.DeleteButton>
//       </td>
//     </S.StudentBox>
//   );
// }
// // ${tw`p-5 m-5 text-xl flex justify-between border-4 border-black`}
// const S = {
//   StudentBox: styled.div`
//     ${tw` border-black`}
//   `,
//   DeleteButton: styled.button`
//     ${tw`p-3 border-2`}
//   `,
// };
