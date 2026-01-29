const getRandom = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

export const getFunnyQuote = (code: number, temp: number): string => {
    // Extreme Temps
    if (temp > 35) return getRandom([
        "Nóng chảy mỡ, bật điều hòa đi thôi!",
        "Thời tiết này trứng ốp la trên mặt đường được luôn.",
        "Nắng chiếu lung linh muôn hoa vàng, mình thì cháy nắng."
    ]);
    if (temp > 30) return getRandom([
        "Nắng cực... à nhầm, cực nắng.",
        "Ra đường nhớ mang kem chống nắng, không là thành than.",
        "Trời xanh mây trắng nắng vàng, anh say nắng hay là say em?"
    ]);
    if (temp < 10) return getRandom([
        "Lạnh teo, cần tuyển người yêu gấp.",
        "Gió lạnh đầu mùa, tay ai chưa ấm thì tự đút túi quần.",
        "Thời tiết này chỉ muốn cuộn tròn trong chăn."
    ]);
    if (temp < 0) return getRandom([
        "Đóng băng rồi, ở nhà đắp chăn cho lành.",
        "Mùa đông không lạnh vì đã có... áo bông."
    ]);

    // Weather Codes
    switch (code) {
        case 0: // Clear sky
        case 1:
            return getRandom([
                "Trời đẹp thế này mà không đi chơi thì phí.",
                "Bầu trời hôm nay thật đẹp, nó ánh lên sắc màu của hạnh phúc.",
                "Hạnh phúc là khi ngước nhìn bầu trời xanh mà không còn muốn ước điều gì nữa.",
                "Nụ cười ấy như bầu trời đầy nắng, chiếu sáng tâm hồn tôi.",
                "Nắng vàng soi sáng, tim mình rộn ràng."
            ]);
        case 2: // Partly cloudy
            return getRandom([
                "Mây che phủ, tâm trạng cũng âm u theo.",
                "Mây trắng là em, trời xanh là anh.",
                "Một áng mây trôi, lòng người chơi vơi.",
                "Bầu trời to lớn luôn ôm ấp những bóng mây nhỏ bé."
            ]);
        case 3: // Overcast
            return getRandom([
                "Bầu trời xám xịt, nhưng vibe của bạn phải chất.",
                "Những áng mây như vô định, nỗi buồn biết tỏ cùng ai.",
                "Trời buồn trời đổ mây đen, người buồn người có nhớ ai bao giờ.",
                "Màu trời u sầu, hòa quyện nỗi nhớ nhung."
            ]);
        case 45: // Fog
        case 48:
            return getRandom([
                "Sương mù giăng kín lối, cẩn thận lạc trôi.",
                "Mờ mờ ảo ảo, nhìn đời thêm xinh.",
                "Sương khói mờ nhân ảnh, ai biết tình ai có đậm đà."
            ]);
        case 51: // Drizzle
        case 53:
        case 55:
            return getRandom([
                "Mưa phùn lất phất, buồn ơi là sầu.",
                "Mưa bay lất phất, nhớ người yêu cũ ghê.",
                "Một chút vấn vương liệu có dệt nên thương nhớ."
            ]);
        case 61: // Rain
        case 63:
        case 65:
            return getRandom([
                "Mưa rơi tí tách, nhớ người yêu cũ chưa?",
                "Phút giây giận hờn như cơn mưa rào, đến rồi đi.",
                "Mưa là sự kết nối giữa trời và đất, còn em là kết nối giữa anh và nỗi đau.",
                "Free shower! Nhớ mang xà bông.",
                "Trời mưa bong bóng phập phồng..."
            ]);
        case 80: // Rain showers
        case 81:
        case 82:
            return getRandom([
                "Ông trời đang khóc thay cho ví tiền của bạn.",
                "Mưa xối xả, rửa trôi hết muộn phiền (hoặc lớp makeup).",
                "Bầu trời bão giông cũng không bằng bão lòng."
            ]);
        case 95: // Thunderstorm
        case 96:
        case 99:
            return getRandom([
                "Sấm chớp đùng đùng, tắt máy tính đi ngủ.",
                "Thor đang giận dữ, cẩn thận củi lửa.",
                "Bão to gió lớn, ở nhà là nhất."
            ]);
        case 71: // Snow
        case 73:
        case 75:
            return getRandom([
                "Tuyết rơi mùa hè? À làm gì có, đang mơ à.",
                "Do you want to build a snowman?.",
                "Lạnh giá nhưng lãng mạn vô cùng."
            ]);
        default:
            return getRandom([
                "Thời tiết thất thường như người yêu cũ.",
                "Hôm nay trời đẹp, nhưng không bằng em.",
                "Đi qua ngày mưa mới biết yêu thêm ngày nắng."
            ]);
    }
};
